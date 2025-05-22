import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsIn,
  ArrayNotEmpty,
} from 'class-validator';

export type DifficultyLevel = 'junior' | 'intermediate' | 'senior';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Frontend Test' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'junior',
    enum: ['junior', 'intermediate', 'senior'],
  })
  @IsString()
  @IsIn(['junior', 'intermediate', 'senior'])
  difficulty: 'junior' | 'intermediate' | 'senior';

  @ApiProperty({ example: ['uuid-stack-1', 'uuid-stack-2'], type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  stackIds: string[];
}
