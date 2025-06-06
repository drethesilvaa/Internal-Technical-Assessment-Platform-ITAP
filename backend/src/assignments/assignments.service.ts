import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AssignTestDto } from './dto/assign-test.dto';
import { TestAssignment } from '../entities/test-assignment.entity';
import { User } from '../entities/user.entity';
import { TestTemplate } from '../entities/test-template.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { generateToken } from '../shared/utils/token-generator';
import { instanceToPlain } from 'class-transformer';
import { QueryRunner } from 'typeorm';
import { UpdateTestDto } from './dto/update-test.dto';

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

    private readonly dataSource: DataSource,
  ) {}

  async assignTest(dto: AssignTestDto, manager: User) {
    const template = await this.templateRepo.findOne({
      where: { id: dto.templateId },
    });
    if (!template) throw new NotFoundException('Template not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const assignment = this.assignmentRepo.create({
        candidateName: dto.candidateName,
        candidateEmail: dto.candidateEmail,
        template,
        createdBy: manager,
        status: 'assigned',
        deadline: new Date(dto.deadline),
        token: generateToken(),
      });

      const savedAssignment = await queryRunner.manager.save(assignment);

      await this.notifications.sendTestInvite(
        dto.candidateName,
        dto.candidateEmail,
        savedAssignment.token,
        savedAssignment.deadline,
      );

      await queryRunner.commitTransaction();
      return savedAssignment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAssignmentsByManager(managerId: string) {
    return this.assignmentRepo.find({
      where: { createdBy: { id: managerId } },
      relations: ['template'],
    });
  }

  async findByToken(token: string) {
    return this.assignmentRepo.findOne({
      where: { token },
      relations: ['template'],
    });
  }

  async getAll() {
    const tests = await this.assignmentRepo.find({
      relations: ['template', 'createdBy'],
    });

    return tests.map((test) => instanceToPlain(test));
  }

  async getAssignment(id: string) {
    const test = await this.assignmentRepo.findOne({
      where: { id: id },
      relations: ['template', 'createdBy'],
    });

    return instanceToPlain(test);
  }

  async updateTest(id: string, dto: UpdateTestDto) {
    const entity = await this.assignmentRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Test not found');

    Object.assign(entity, dto);
    return this.assignmentRepo.save(entity);
  }
}
