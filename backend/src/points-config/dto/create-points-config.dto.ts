import { IsIn, IsInt, Min } from 'class-validator';

export class CreatePointsConfigDto {
  @IsIn(['junior', 'intermediate', 'senior'])
  difficulty: 'junior' | 'intermediate' | 'senior';

  @IsInt()
  @Min(1)
  totalPoints: number;

  @IsInt()
  @Min(1)
  minQuestions: number;
}
