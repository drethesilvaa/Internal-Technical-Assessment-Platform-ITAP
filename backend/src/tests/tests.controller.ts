import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { CompleteTestDto } from './dto/complete-test.dto';
import { CandidateTokenGuard } from '../shared/guards/candidate-token.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Candidate')
@Controller()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(CandidateTokenGuard)
  @Get('test/:token')
  @ApiOperation({ summary: 'Pulls assigned test by token' })
  getTest(@Param('token') token: string) {
    return this.testsService.getTestByToken(token);
  }

  @UseGuards(CandidateTokenGuard)
  @Post('submit-answer')
  @ApiOperation({ summary: 'Submit answer to a question' })
  submit(@Body() dto: SubmitAnswerDto) {
    return this.testsService.submitAnswer(dto);
  }

  @UseGuards(CandidateTokenGuard)
  @Post('complete-test')
  @ApiOperation({ summary: 'Finalizes test submission' })
  complete(@Body() dto: CompleteTestDto) {
    return this.testsService.completeTest(dto);
  }
}
