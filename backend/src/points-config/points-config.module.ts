import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsConfig } from '../entities/points-config.entity';
import { PointsConfigService } from './points-config.service';
import { PointsConfigController } from './points-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PointsConfig])],
  providers: [PointsConfigService],
  controllers: [PointsConfigController],
  exports: [PointsConfigService],
})
export class PointsConfigModule {}
