import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login for admins/managers' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'Validate candidate token' })
  validateToken(@Body() dto: ValidateTokenDto) {
    return this.authService.validateCandidateToken(dto);
  }
}
