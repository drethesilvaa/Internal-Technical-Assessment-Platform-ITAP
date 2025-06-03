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
      relations: [
        'template',
        'template.questions',
        'results',
        'results.questionResults',
        'results.questionResults.question',
      ],
    });

    if (!assignment) throw new NotFoundException('Invalid token');

    let testResult: TestResult | null = assignment.results[0];
    if (!testResult) {
      testResult = this.resultRepo.create({
        testAssignment: assignment,
        startedAt: new Date(),
        totalScore: 0,
      });
      await this.resultRepo.save(testResult);
    }

    const answeredQuestionIds = new Set(
      testResult?.questionResults?.map((qr) => qr.answer) || [],
    );

    if (assignment.status !== 'in progress') {
      assignment.status = 'in progress';
      await this.assignmentRepo.save(assignment);
    }

    return {
      testResultId: testResult?.id,
      questions: assignment.template.questions.map((q) => ({
        id: q.id,
        answered: answeredQuestionIds.has(q.id),
      })),
    };
  }

  async getTestInfoByToken(token: string) {
    const assignment = await this.assignmentRepo.findOne({
      where: { token },
      relations: [
        'template',
        'template.questions',
        'template.createdBy',
        'results',
        'results.questionResults',
      ],
    });

    if (!assignment) throw new NotFoundException('Invalid token aaaa');

    const testResult = assignment.results[0];

    let totalTimeSpent = 0;
    let totalTabSwitches = 0;
    let answeredQuestions = 0;

    console.log(assignment);

    if (testResult && testResult.questionResults) {
      totalTimeSpent = testResult.questionResults.reduce(
        (acc, qr) => acc + (qr.timeSpent || 0),
        0,
      );
      totalTabSwitches = testResult.questionResults.reduce(
        (acc, qr) => acc + (qr.tabSwitches || 0),
        0,
      );
      answeredQuestions = testResult.questionResults.filter(
        (a) => a.answer !== '',
      ).length;
    }

    return {
      template: assignment.template.name,
      nQuestions: assignment.template.questions.length,
      answeredQuestions,
      createdBy: assignment.template.createdBy.name,
      deadline: assignment.deadline,
      totalTimeSpent,
      totalTabSwitches,
      status: assignment.status,
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
