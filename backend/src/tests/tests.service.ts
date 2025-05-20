import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { CompleteTestDto } from './dto/complete-test.dto';
import { TestAssignment } from '../entities/test-assignment.entity';
import { QuestionResult } from '../entities/question-result.entity';
import { TestResult } from '../entities/test-result.entity';
import { Question } from '../entities/question.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestAssignment)
    private assignmentRepo: Repository<TestAssignment>,
    @InjectRepository(TestResult)
    private resultRepo: Repository<TestResult>,
    @InjectRepository(QuestionResult)
    private questionResultRepo: Repository<QuestionResult>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async getTestByToken(token: string) {
    const assignment = await this.assignmentRepo.findOne({
      where: { token },
      relations: ['template', 'template.questions'],
    });

    if (!assignment) throw new NotFoundException('Invalid token');
    return {
      template: assignment.template.name,
      questions: assignment.template.questions.map((q) => ({
        id: q.id,
        content: q.content,
        type: q.type,
        points: q.points,
      })),
    };
  }

  async submitAnswer(dto: SubmitAnswerDto) {
    const result = await this.resultRepo.findOne({
      where: { id: dto.testId },
    });
    if (!result) throw new NotFoundException('Test result not found');

    const question = await this.questionRepo.findOne({
      where: { id: dto.questionId },
    });
    if (!question) throw new NotFoundException('Question not found');

    const answer = this.questionResultRepo.create({
      testResult: result,
      question,
      answer: dto.answer,
      timeSpent: dto.timeSpent,
      score: 0, // grading later
      tabSwitches: 0,
    });

    return this.questionResultRepo.save(answer);
  }

  async completeTest(dto: CompleteTestDto) {
    const result = await this.resultRepo.findOne({ where: { id: dto.testId } });
    if (!result) throw new NotFoundException('Test result not found');

    result.completedAt = new Date();
    return this.resultRepo.save(result);
  }
}
