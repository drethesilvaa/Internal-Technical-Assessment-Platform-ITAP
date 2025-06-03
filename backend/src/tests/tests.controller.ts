import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { CompleteTestDto } from './dto/complete-test.dto';
import { CandidateTokenGuard } from '../shared/guards/candidate-token.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QuestionResultService } from 'src/question-result/question-result.service';

@ApiTags('Candidate')
@Controller()
export class TestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly qResultsService: QuestionResultService,
  ) {}

  @UseGuards(CandidateTokenGuard)
  @Get('test/:token')
  @ApiOperation({ summary: 'Pulls assigned test by token' })
  getTest(@Param('token') token: string) {
    return this.testsService.getTestByToken(token);
  }

  @UseGuards(CandidateTokenGuard)
  @Get('test/info/:token')
  @ApiOperation({ summary: 'Pulls assigned test info' })
  getTestInfo(@Param('token') token: string) {
    return this.testsService.getTestInfoByToken(token);
  }

  @UseGuards(CandidateTokenGuard)
  @Get('test/question/:questionId')
  async getQuestion(
    @Query('assignmentToken') assignmentToken: string,
    @Param('questionId') questionId: string,
  ) {
    return this.qResultsService.getQuestionForTest(assignmentToken, questionId);
  }

  @UseGuards(CandidateTokenGuard)
  @Get('test/question-result/:id/time')
  async getTimeSpent(@Param('id') id: string) {
    return this.qResultsService.getTimeSpent(id);
  }

  @UseGuards(CandidateTokenGuard)
  @Patch('test/question-result/:id/time')
  async updateTimeSpent(
    @Param('id') id: string,
    @Body() body: { seconds: number; tabSwitch?: boolean },
  ) {
    return this.qResultsService.updateTimeSpent(id, body);
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
