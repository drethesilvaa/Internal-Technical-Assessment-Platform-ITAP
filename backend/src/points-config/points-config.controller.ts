import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PointsConfigService } from './points-config.service';
import { CreatePointsConfigDto } from './dto/create-points-config.dto';
import { UpdatePointsConfigDto } from './dto/update-points-config.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiTags('PointsConfig')
@Controller('points-config')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PointsConfigController {
  constructor(private service: PointsConfigService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreatePointsConfigDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdatePointsConfigDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
