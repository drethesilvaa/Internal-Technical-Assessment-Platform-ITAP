import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  UnauthorizedException,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login for admins/managers' })
  @HttpCode(200)
  async login(@Res({ passthrough: true }) res: any, @Body() dto: LoginDto) {
    const { access_token, refresh_token, user } =
      await this.authService.login(dto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 15, // 15 min
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return { user };
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req, @Res({ passthrough: true }) res: any) {
    const refresh_token = req.cookies['refresh_token'];

    const newAccessToken =
      await this.authService.refreshAccessToken(refresh_token);

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 15, // 15 min
    });

    return { access_token: newAccessToken };
  }

  @Post('validate-token')
  @ApiOperation({ summary: 'Validate candidate token' })
  validateToken(@Body() dto: ValidateTokenDto) {
    return this.authService.validateCandidateToken(dto);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
