import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { TestResult } from '../entities/test-result.entity';
import { QuestionResult } from '../entities/question-result.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(TestResult)
    private resultRepo: Repository<TestResult>,
    @InjectRepository(QuestionResult)
    private questionResultRepo: Repository<QuestionResult>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getResultByTestId(testId: string) {
    const result = await this.resultRepo.findOne({
      where: { id: testId },
      relations: ['testAssignment', 'questionResults'],
    });

    if (!result) throw new NotFoundException('Test result not found');
    return result;
  }

  async compareCandidates(id1: string, id2: string) {
    const results1 = await this.resultRepo.find({
      where: { testAssignment: { candidateEmail: id1 } },
      relations: ['testAssignment'],
    });

    const results2 = await this.resultRepo.find({
      where: { testAssignment: { candidateEmail: id2 } },
      relations: ['testAssignment'],
    });

    return { candidate1: results1, candidate2: results2 };
  }

  async getGlobalAnalytics() {
    const totalTests = await this.resultRepo.count();
    const avgScore = await this.resultRepo
      .createQueryBuilder('result')
      .select('AVG(result.totalScore)', 'avg')
      .getRawOne();

    return {
      totalTests,
      averageScore: Number(avgScore.avg || 0).toFixed(2),
    };
  }
}
