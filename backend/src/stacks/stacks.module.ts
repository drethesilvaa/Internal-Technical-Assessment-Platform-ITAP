import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stack } from 'src/entities/stack.entity';
import { StacksController } from './stacks.controller';
import { StacksService } from './stacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stack])],
  controllers: [StacksController],
  providers: [StacksService],
  exports: [StacksService],
})
export class StacksModule {}
