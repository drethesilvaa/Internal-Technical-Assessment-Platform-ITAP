import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('Results')
@Controller('results')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get(':testId')
  @Roles('manager', 'reviewer')
  @ApiOperation({ summary: 'Get result for a specific test' })
  getResult(@Param('testId') id: string) {
    return this.resultsService.getResultByTestId(id);
  }

  @Get('compare/:candidate1/:candidate2')
  @Roles('manager', 'reviewer')
  @ApiOperation({ summary: 'Compare two candidates' })
  compare(@Param('candidate1') id1: string, @Param('candidate2') id2: string) {
    return this.resultsService.compareCandidates(id1, id2);
  }
}
