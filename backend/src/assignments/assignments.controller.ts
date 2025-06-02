import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignTestDto } from './dto/assign-test.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { UpdateTestDto } from './dto/update-test.dto';

@ApiTags('Assignments')
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  @Get('tests')
  @Roles('admin')
  @ApiOperation({ summary: 'List all tests' })
  getAllAssignments() {
    return this.service.getAll();
  }

  @Get('tests/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get Test By Id' })
  getAssignment(@Param('id') id: string) {
    return this.service.getAssignment(id);
  }

  @Post('assign-test')
  @Roles('manager', 'admin')
  @ApiOperation({ summary: 'Assign test to candidate' })
  assign(@Body() dto: AssignTestDto, @Request() req) {
    return this.service.assignTest(dto, req.user);
  }

  @Get('assigned-tests/:managerId')
  @Roles('manager', 'admin')
  @ApiOperation({ summary: 'List assigned tests by manager' })
  getAssignments(@Param('managerId') managerId: string) {
    return this.service.getAssignmentsByManager(managerId);
  }

  @Patch('test/:id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Update Test Data' })
  updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.service.updateTest(id, dto);
  }
}
