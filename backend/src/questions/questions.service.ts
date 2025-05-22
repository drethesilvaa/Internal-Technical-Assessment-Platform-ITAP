import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOption } from 'src/entities/question-option.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(QuestionOption)
    private optionRepo: Repository<QuestionOption>,
  ) {}

  async create(dto: CreateQuestionDto) {
    const question = this.questionRepo.create({
      ...dto,
      options: dto.options || [],
    });
    return this.questionRepo.save(question);
  }

  findAll() {
    return this.questionRepo.find();
  }

  findOne(id: string) {
    return this.questionRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateQuestionDto) {
    await this.questionRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    if (!question) throw new NotFoundException();
    return this.questionRepo.remove(question);
  }
}
