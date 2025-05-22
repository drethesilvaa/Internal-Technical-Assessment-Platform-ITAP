import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionOption } from 'src/entities/question-option.entity';
import { Stack } from 'src/entities/stack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionOption, Stack])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
