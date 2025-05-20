import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { QuestionType } from 'src/entities/question.entity';

export class CreateQuestionDto {
  @ApiProperty({ enum: ['code', 'mcq', 'text'] })
  @IsString()
  type: QuestionType;

  @ApiProperty()
  @IsString()
  difficulty: string;

  @ApiProperty()
  @IsNumber()
  points: number;

  @ApiProperty()
  @IsString()
  content: string;
}
