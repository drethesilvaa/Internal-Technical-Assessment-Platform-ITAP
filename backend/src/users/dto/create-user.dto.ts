import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsIn } from 'class-validator';

export type UserRole = 'candidate' | 'manager' | 'reviewer' | 'admin';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['candidate', 'manager', 'reviewer', 'admin'] })
  role: UserRole;
}
