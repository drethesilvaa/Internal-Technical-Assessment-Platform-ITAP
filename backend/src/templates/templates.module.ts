import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestTemplate, Question])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
