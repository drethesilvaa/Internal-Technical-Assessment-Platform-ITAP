import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString } from 'class-validator';

export class AssignTestDto {
  @ApiProperty({ description: 'Candidate user ID' })
  @IsUUID()
  candidateId: string;

  @ApiProperty({ description: 'Test template ID' })
  @IsUUID()
  templateId: string;

  @ApiProperty({ description: 'Deadline in ISO format' })
  @IsDateString()
  deadline: string;
}
