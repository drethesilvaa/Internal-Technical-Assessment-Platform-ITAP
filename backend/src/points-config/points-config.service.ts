import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointsConfig } from '../entities/points-config.entity';
import { CreatePointsConfigDto } from './dto/create-points-config.dto';
import { UpdatePointsConfigDto } from './dto/update-points-config.dto';

@Injectable()
export class PointsConfigService {
  constructor(
    @InjectRepository(PointsConfig)
    private repo: Repository<PointsConfig>,
  ) {}

  create(dto: CreatePointsConfigDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePointsConfigDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Points config not found');

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Points config not found');

    return this.repo.remove(entity);
  }
}
