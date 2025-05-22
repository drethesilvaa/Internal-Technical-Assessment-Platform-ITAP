import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionOptionDto {
  @IsString()
  text: string;

  @IsOptional()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  content: string;

  @IsEnum(['code', 'mcq', 'text'])
  type: 'code' | 'mcq' | 'text';

  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @IsNumber()
  points: number;

  @IsOptional()
  @IsString()
  correctAnswer?: string;

  @IsOptional()
  templateId?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options?: CreateQuestionOptionDto[];
}
