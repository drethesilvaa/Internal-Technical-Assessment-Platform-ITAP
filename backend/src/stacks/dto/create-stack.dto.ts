import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStackDto {
  @ApiProperty()
  @IsString()
  name: string;
}
