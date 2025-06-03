import { Module } from '@nestjs/common';
import { QuestionResultService } from './question-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAssignment } from 'src/entities/test-assignment.entity';
import { TestResult } from 'src/entities/test-result.entity';
import { QuestionResult } from 'src/entities/question-result.entity';
import { Question } from 'src/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestAssignment,
      TestResult,
      QuestionResult,
      Question,
    ]),
  ],
  providers: [QuestionResultService],
  exports: [QuestionResultService],
})
export class QuestionResultModule {}
