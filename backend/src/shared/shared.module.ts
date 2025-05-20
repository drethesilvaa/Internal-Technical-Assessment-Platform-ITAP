import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { CandidateTokenGuard } from './guards/candidate-token.guard';

@Module({
  providers: [RolesGuard, CandidateTokenGuard],
  exports: [RolesGuard, CandidateTokenGuard],
})
export class SharedModule {}
