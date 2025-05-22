import { PartialType } from '@nestjs/swagger';
import { CreatePointsConfigDto } from './create-points-config.dto';

export class UpdatePointsConfigDto extends PartialType(CreatePointsConfigDto) {}
