import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';

@ApiTags('Templates')
@Controller('templates')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @Post()
  @Roles('reviewer')
  @ApiOperation({ summary: 'Create a test template with questions' })
  create(@Body() dto: CreateTemplateDto, @Request() req) {
    return this.service.createTemplate(dto, req.user);
  }

  @Get()
  @Roles('reviewer', 'admin')
  @ApiOperation({ summary: 'List all templates' })
  getAll() {
    return this.service.getAllTemplates();
  }
}
