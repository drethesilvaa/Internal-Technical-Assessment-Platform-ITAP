import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AnalyticsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('global')
  @Roles('admin')
  @ApiOperation({ summary: 'View test volume and average scores' })
  globalAnalytics() {
    return this.resultsService.getGlobalAnalytics();
  }
}
