import { IsDecimal, IsIn, IsInt, Min } from 'class-validator';

export class CreatePointsConfigDto {
  @IsIn(['junior', 'intermediate', 'senior'])
  difficulty: 'junior' | 'intermediate' | 'senior';

  @IsInt()
  @Min(1)
  totalPoints: number;

  @IsInt()
  @Min(1)
  minQuestions: number;

  @IsDecimal()
  @Min(0.1)
  easyQuestionsPercentage: number;

  @IsDecimal()
  @Min(0.1)
  mediumQuestionsPercentage: number;

  @IsDecimal()
  @Min(0.1)
  hardQuestionsPercentage: number;
}
