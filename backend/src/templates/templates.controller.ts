import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { UpdateTemplateDto } from './dto/update-template.dto';

@ApiTags('Templates')
@Controller('templates')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @Post()
  @Roles('reviewer', 'admin')
  @ApiOperation({ summary: 'Create a test template with questions' })
  create(@Body() dto: CreateTemplateDto, @Request() req) {
    return this.service.createTemplate(dto, req.user);
  }

  @Patch(':id')
  @Roles('admin', 'reviewer')
  @ApiOperation({ summary: 'Update a template by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    return this.service.update(id, dto);
  }

  @Get()
  @Roles('reviewer', 'admin')
  @ApiOperation({ summary: 'List all templates' })
  getAll() {
    return this.service.getAllTemplates();
  }

  @Get(':id')
  @Roles('reviewer', 'admin')
  @ApiOperation({ summary: 'List template by Id' })
  getById(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @Roles('admin','reviewer')
  @ApiOperation({ summary: 'Delete template by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
