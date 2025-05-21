import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { Stack } from 'src/entities/stack.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StacksService {
  constructor(
    @InjectRepository(Stack)
    private stackRepo: Repository<Stack>,
  ) {}

  create(dto: CreateStackDto) {
    const stack = this.stackRepo.create(dto);
    return this.stackRepo.save(stack);
  }

  findAll() {
    return this.stackRepo.find();
  }

  findOne(id: string) {
    return this.stackRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    const stack = await this.findOne(id);
    if (!stack) throw new NotFoundException('Stack not found');
    return this.stackRepo.remove(stack);
  }
}
