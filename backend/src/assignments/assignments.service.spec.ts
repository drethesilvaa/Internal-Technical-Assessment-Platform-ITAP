import { AssignmentsService } from './assignments.service';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { TestAssignment } from '../entities/test-assignment.entity';
import { User } from '../entities/user.entity';
import { TestTemplate } from '../entities/test-template.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotFoundException } from '@nestjs/common';

describe('AssignmentsService', () => {
  let service: AssignmentsService;
  let assignmentRepo: jest.Mocked<Repository<TestAssignment>>;
  let userRepo: jest.Mocked<Repository<User>>;
  let templateRepo: jest.Mocked<Repository<TestTemplate>>;
  let notifications: jest.Mocked<NotificationsService>;
  let dataSource: jest.Mocked<DataSource>;
  let queryRunner: jest.Mocked<QueryRunner>;

  const mockManager = { id: 'manager-1' } as User;

  beforeEach(() => {
    assignmentRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    } as any;

    userRepo = {} as any;
    templateRepo = {
      findOne: jest.fn(),
    } as any;

    notifications = {
      sendTestInvite: jest.fn(),
    } as any;

    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      manager: { save: jest.fn() },
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    } as any;

    dataSource = {
      createQueryRunner: jest.fn(() => queryRunner),
    } as any;

    service = new AssignmentsService(
      assignmentRepo,
      userRepo,
      templateRepo,
      notifications,
      dataSource,
    );
  });

  describe('assignTest', () => {
    const dto = {
      candidateName: 'Alice',
      candidateEmail: 'alice@example.com',
      templateId: 'template-1',
      deadline: '2025-06-01T00:00:00.000Z',
    };

    it('should throw if template is not found', async () => {
      (templateRepo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.assignTest(dto, mockManager)).rejects.toThrow(
        new NotFoundException('Template not found'),
      );
    });

    it('should create and save a test assignment, send invite and commit', async () => {
      const fakeTemplate = { id: 'template-1' } as TestTemplate;
      (templateRepo.findOne as jest.Mock).mockResolvedValue(fakeTemplate);

      const fakeAssignment = {
        id: 'assignment-1',
        candidateName: dto.candidateName,
        candidateEmail: dto.candidateEmail,
        template: fakeTemplate,
        createdBy: mockManager,
        status: 'assigned',
        deadline: dto.deadline,
        token: 'mock-token',
        results: [],
        stack: null, 
      } as unknown as TestAssignment;

      (assignmentRepo.create as jest.Mock).mockReturnValue(fakeAssignment);
      (queryRunner.manager.save as jest.Mock).mockResolvedValue(fakeAssignment);

      await expect(service.assignTest(dto, mockManager)).resolves.toEqual(
        fakeAssignment,
      );

      expect(templateRepo.findOne).toHaveBeenCalledWith({
        where: { id: dto.templateId },
      });
      expect(assignmentRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          candidateName: dto.candidateName,
          candidateEmail: dto.candidateEmail,
          template: fakeTemplate,
          createdBy: mockManager,
          status: 'assigned',
        }),
      );
      expect(queryRunner.manager.save).toHaveBeenCalledWith(fakeAssignment);
      expect(notifications.sendTestInvite).toHaveBeenCalledWith(
        dto.candidateName,
        dto.candidateEmail,
        fakeAssignment.token,
        fakeAssignment.deadline,
      );
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it('should rollback transaction and release on error', async () => {
      const fakeTemplate = { id: 'template-1' } as TestTemplate;
      (templateRepo.findOne as jest.Mock).mockResolvedValue(fakeTemplate);
      (assignmentRepo.create as jest.Mock).mockReturnValue(
        {} as TestAssignment,
      );
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );

      await expect(service.assignTest(dto, mockManager)).rejects.toThrow(
        'DB error',
      );
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });
  });

  describe('getAssignmentsByManager', () => {
    it('should return assignments filtered by manager', async () => {
      const assignments = [{ id: 'a1' }, { id: 'a2' }];
      (assignmentRepo.find as jest.Mock).mockResolvedValue(assignments);

      const result = await service.getAssignmentsByManager('manager-1');
      expect(assignmentRepo.find).toHaveBeenCalledWith({
        where: { createdBy: { id: 'manager-1' } },
        relations: ['template'],
      });
      expect(result).toBe(assignments);
    });
  });
});
