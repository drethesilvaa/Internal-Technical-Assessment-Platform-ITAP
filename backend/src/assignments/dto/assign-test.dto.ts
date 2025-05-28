import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsDateString, IsEmail } from 'class-validator';

export class AssignTestDto {
  @ApiProperty({ description: 'Candidate name' })
  @IsString()
  candidateName: string;

  @ApiProperty({ description: 'Candidate Email' })
  @IsEmail()
  candidateEmail: string;

  @ApiProperty({ description: 'Test template ID' })
  @IsUUID()
  templateId: string;

  @ApiProperty({ description: 'Deadline in ISO format' })
  @IsDateString()
  deadline: string;
}
