import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty()
  @IsString()
  token: string;
}
