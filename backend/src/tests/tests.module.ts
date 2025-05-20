import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestAssignment } from '../entities/test-assignment.entity';
import { TestResult } from '../entities/test-result.entity';
import { QuestionResult } from '../entities/question-result.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestAssignment,
      TestResult,
      QuestionResult,
      Question,
    ]),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
