import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';
import { StacksModule } from 'src/stacks/stacks.module';
import { QuestionOption } from 'src/entities/question-option.entity';
import { Stack } from 'src/entities/stack.entity';
import { PointsConfig } from 'src/entities/points-config.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestTemplate,
      Question,
      Stack,
      PointsConfig,
      QuestionOption,
    ]),
    StacksModule,
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
