import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { User } from '../entities/user.entity';
import { Stack } from 'src/entities/stack.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TestTemplate)
    private templateRepo: Repository<TestTemplate>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Stack)
    private stackRepo: Repository<Stack>,
  ) {}

  async createTemplate(dto: CreateTemplateDto, createdBy: User) {
    const stack = await this.stackRepo.findOne({ where: { id: dto.stackId } });
    if (!stack) throw new NotFoundException('Stack not found');

    const template = this.templateRepo.create({
      ...dto,
      stack,
      createdBy,
    });

    const savedTemplate = await this.templateRepo.save(template);

    const questions = dto.questions.map((q) =>
      this.questionRepo.create({
        content: q.content,
        type: q.type,
        difficulty: q.difficulty,
        points: q.points,
        template: savedTemplate,
      }),
    );

    await this.questionRepo.save(questions);
    return { template: savedTemplate, questions };
  }

  getAllTemplates() {
    return this.templateRepo.find({ relations: ['questions'] });
  }
}
