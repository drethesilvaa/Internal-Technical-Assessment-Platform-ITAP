import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';
import { TestAssignment } from '../entities/test-assignment.entity';
import { TestResult } from '../entities/test-result.entity';
import { QuestionResult } from '../entities/question-result.entity';
import { Question } from '../entities/question.entity';
import { QuestionResultModule } from 'src/question-result/question-result.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestAssignment,
      TestResult,
      QuestionResult,
      Question,
    ]),
    QuestionResultModule
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
