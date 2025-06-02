import { PartialType } from '@nestjs/swagger';
import { AssignTestDto } from './assign-test.dto';

export class UpdateTestDto extends PartialType(AssignTestDto) {}
