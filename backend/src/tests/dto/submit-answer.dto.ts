import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber } from 'class-validator';

export class SubmitAnswerDto {
  @ApiProperty()
  @IsUUID()
  testId: string;

  @ApiProperty()
  @IsUUID()
  questionId: string;

  @ApiProperty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNumber()
  timeSpent: number;
}
