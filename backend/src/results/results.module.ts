import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { TestResult } from '../entities/test-result.entity';
import { QuestionResult } from '../entities/question-result.entity';
import { User } from '../entities/user.entity';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult, QuestionResult, User])],
  controllers: [ResultsController, AnalyticsController],
  providers: [ResultsService],
})
export class ResultsModule {}
