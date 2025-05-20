import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['candidate', 'manager', 'reviewer', 'admin'] })
  @IsOptional()
  @IsIn(['candidate', 'manager', 'reviewer', 'admin'])
  role?: string;
}
