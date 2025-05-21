import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StacksService } from './stacks.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UpdateStackDto } from './dto/update-stack.dto';

@ApiTags('Stacks')
@Controller('stacks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StacksController {
  constructor(private readonly stacksService: StacksService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new stack' })
  create(@Body() dto: CreateStackDto) {
    return this.stacksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stacks' })
  findAll() {
    return this.stacksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stack by ID' })
  findOne(@Param('id') id: string) {
    return this.stacksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update stack by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateStackDto) {
    return this.stacksService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete stack by ID' })
  remove(@Param('id') id: string) {
    return this.stacksService.remove(id);
  }
}
