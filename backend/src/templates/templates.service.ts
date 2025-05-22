import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';
import { Stack } from '../entities/stack.entity';
import { PointsConfig } from '../entities/points-config.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TestTemplate)
    private templateRepo: Repository<TestTemplate>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Stack)
    private stackRepo: Repository<Stack>,
    @InjectRepository(PointsConfig)
    private pointsConfigRepo: Repository<PointsConfig>,
  ) {}

  async createTemplate(dto: CreateTemplateDto, createdBy: User) {
    const stacks = await this.stackRepo.findBy({ id: In(dto.stackIds) });
    if (stacks.length === 0) throw new NotFoundException('Stacks not found');
    
    const config = await this.pointsConfigRepo.findOne({
      where: { level: dto.difficulty },
    });
    if (!config) throw new NotFoundException('Points config not found');

    const allQuestions = await this.questionRepo.find({
      where: { stack: In(stacks.map((s) => s.id)) },
    });

    const filtered: Question[] = [];
    let currentPoints = 0;

    const weights = {
      junior: { easy: 0.6, medium: 0.4, hard: 0 },
      intermediate: { easy: 0.4, medium: 0.4, hard: 0.2 },
      senior: { easy: 0.2, medium: 0.3, hard: 0.5 },
    };

    const target = {
      total: config.totalPoints,
      min: config.minQuestions,
      byDiff: weights[dto.difficulty],
    };

    const groupByDifficulty = (diff: string) =>
      allQuestions.filter((q) => q.difficulty === diff);

    const randomize = (arr: Question[]) =>
      [...arr].sort(() => Math.random() - 0.5);

    for (const level of ['easy', 'medium', 'hard'] as const) {
      const maxPoints = Math.floor(target.total * target.byDiff[level]);
      let pool = randomize(groupByDifficulty(level));

      for (const q of pool) {
        if (currentPoints + q.points > target.total) break;
        filtered.push(q);
        currentPoints += q.points;
        if (currentPoints >= target.total) break;
      }
    }

    if (filtered.length < target.min) {
      throw new NotFoundException(
        'Not enough questions to meet the minimum required.',
      );
    }

    const template = this.templateRepo.create({
      name: dto.name,
      difficulty: dto.difficulty,
      stacks,
      createdBy,
      questions: filtered,
    });

    return this.templateRepo.save(template);
  }

  getAllTemplates() {
    return this.templateRepo.find({
      relations: ['questions', 'stacks'],
    });
  }
}
