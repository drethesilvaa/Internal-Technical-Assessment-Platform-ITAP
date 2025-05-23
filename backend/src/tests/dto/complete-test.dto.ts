import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CompleteTestDto {
  @ApiProperty()
  @IsUUID()
  testId: string;
}
