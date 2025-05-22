import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';
import { StacksModule } from 'src/stacks/stacks.module';
import { QuestionOption } from 'src/entities/question-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestTemplate, Question, QuestionOption]),
    StacksModule,
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
