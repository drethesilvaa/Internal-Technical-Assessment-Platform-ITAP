import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignTestDto } from './dto/assign-test.dto';
import { TestAssignment } from '../entities/test-assignment.entity';
import { User } from '../entities/user.entity';
import { TestTemplate } from '../entities/test-template.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { generateToken } from 'src/shared/utils/token-generator';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(TestAssignment)
    private assignmentRepo: Repository<TestAssignment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(TestTemplate)
    private templateRepo: Repository<TestTemplate>,
    private readonly notifications: NotificationsService,
  ) {}

  async assignTest(dto: AssignTestDto, manager: User) {
    const candidate = await this.userRepo.findOne({
      where: { id: dto.candidateId, role: 'candidate' },
    });
    if (!candidate) throw new NotFoundException('Candidate not found');

    const template = await this.templateRepo.findOne({
      where: { id: dto.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');

    const assignment = this.assignmentRepo.create({
      candidate,
      template,
      createdBy: manager,
      status: 'assigned',
      deadline: new Date(dto.deadline),
      token: generateToken(),
    });

    const savedAssignment = await this.assignmentRepo.save(assignment);

    await this.notifications.sendTestInvite(
      candidate,
      savedAssignment.token,
      savedAssignment.deadline,
    );

    return savedAssignment;
  }

  async getAssignmentsByManager(managerId: string) {
    return this.assignmentRepo.find({
      where: { createdBy: { id: managerId } },
      relations: ['candidate', 'template'],
    });
  }

  async findByToken(token: string) {
    return this.assignmentRepo.findOne({
      where: { token },
      relations: ['candidate', 'template'],
    });
  }
}
