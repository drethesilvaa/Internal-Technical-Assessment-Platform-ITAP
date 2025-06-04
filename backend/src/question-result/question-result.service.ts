import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOption } from 'src/entities/question-option.entity';
import { QuestionResult } from 'src/entities/question-result.entity';
import { Question } from 'src/entities/question.entity';
import { TestAssignment } from 'src/entities/test-assignment.entity';
import { TestResult } from 'src/entities/test-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionResultService {
  constructor(
    @InjectRepository(TestAssignment)
    private assignmentRepo: Repository<TestAssignment>,
    @InjectRepository(TestResult)
    private testResultRepo: Repository<TestResult>,
    @InjectRepository(QuestionResult)
    private questionResultRepo: Repository<QuestionResult>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
  ) {}

  async getQuestionForTest(
    assignmentToken: string,
    questionId: string,
  ): Promise<{
    question: Question;
    questionResultId: string;
    answerOptions: QuestionOption[];
  }> {
    const assignment = await this.assignmentRepo.findOne({
      where: { token: assignmentToken },
      relations: ['results', 'results.questionResults'],
    });
    if (!assignment) throw new NotFoundException('Invalid token');

    let testResult = assignment.results[0];

    let questionResult = await this.questionResultRepo.findOne({
      where: {
        testResult: { id: testResult.id },
        question: { id: questionId },
      },
    });

    if (!questionResult) {
      const question = await this.questionRepo.findOne({
        where: { id: questionId },
      });
      if (!question) throw new NotFoundException('Question not found');

      questionResult = this.questionResultRepo.create({
        testResult,
        question,
        answer: '',
        score: 0,
        timeSpent: 0,
        tabSwitches: 0,
      });
      await this.questionResultRepo.save(questionResult);
    }

    const question = await this.questionRepo.findOne({
      where: { id: questionId },
      relations: ['options'],
    });
    if (!question) throw new NotFoundException('Question not found');

    return {
      question,
      questionResultId: questionResult.id,
      answerOptions: question?.options.map(({ isCorrect, ...rest }) => rest),
    };
  }

  async getTimeSpent(questionResultId: string) {
    const qr = await this.questionResultRepo.findOneBy({
      id: questionResultId,
    });
    if (!qr) throw new NotFoundException('QuestionResult not found');
    return { timeSpent: qr.timeSpent, tabSwitches: qr.tabSwitches };
  }

  async updateTimeSpent(
    questionResultId: string,
    payload: { seconds: number; tabSwitch?: boolean },
  ) {
    const qr = await this.questionResultRepo.findOneBy({
      id: questionResultId,
    });
    if (!qr) throw new NotFoundException('QuestionResult not found');

    qr.timeSpent += payload.seconds;
    if (payload.tabSwitch) qr.tabSwitches += 1;

    await this.questionResultRepo.save(qr);

    return { success: true };
  }
}
