import { TestTemplate } from '../entities/test-template.entity';
import { Question } from '../entities/question.entity';
import { Stack } from '../entities/stack.entity';
import { PointsConfig } from '../entities/points-config.entity';
import { TemplatesService } from './templates.service';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TemplatesService', () => {
  let service: TemplatesService;

  let templateRepo: jest.Mocked<Repository<TestTemplate>>;
  let stackRepo: jest.Mocked<Repository<Stack>>;
  let questionRepo: jest.Mocked<Repository<Question>>;
  let pointsConfigRepo: jest.Mocked<Repository<PointsConfig>>;

  const mockUser = { id: 'user-1' } as any;

  beforeEach(() => {
    templateRepo = {
      create: jest.fn((data) => data),
      save: jest.fn((data) => Promise.resolve({ id: 'template-1', ...data })),
    } as unknown as jest.Mocked<Repository<TestTemplate>>;

    stackRepo = {
      findBy: jest.fn(),
    } as unknown as jest.Mocked<Repository<Stack>>;

    questionRepo = {
      find: jest.fn(),
    } as unknown as jest.Mocked<Repository<Question>>;

    pointsConfigRepo = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<PointsConfig>>;

    service = new TemplatesService(
      templateRepo,
      questionRepo,
      stackRepo,
      pointsConfigRepo,
    );
  });

  it('should throw if no stacks are found', async () => {
    (stackRepo.findBy as jest.Mock).mockResolvedValue([]);

    await expect(
      service.createTemplate(
        { name: 'Test', difficulty: 'junior', stackIds: ['1'] },
        mockUser,
      ),
    ).rejects.toThrow(new NotFoundException('Stacks not found'));
  });

  it('should throw if no PointsConfig is found', async () => {
    (stackRepo.findBy as jest.Mock).mockResolvedValue([
      { id: '1', name: 'React' },
    ]);
    (pointsConfigRepo.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      service.createTemplate(
        { name: 'Test', difficulty: 'junior', stackIds: ['1'] },
        mockUser,
      ),
    ).rejects.toThrow(new NotFoundException('Points config not found'));
  });

  it('should throw if not enough questions to meet minimum required', async () => {
    (stackRepo.findBy as jest.Mock).mockResolvedValue([
      { id: '1', name: 'React' },
    ]);
    (pointsConfigRepo.findOne as jest.Mock).mockResolvedValue({
      totalPoints: 50,
      minQuestions: 3,
    });
    (questionRepo.find as jest.Mock).mockResolvedValue([
      { id: 'q1', points: 10, difficulty: 'easy', stack: { id: '1' } },
    ]);

    await expect(
      service.createTemplate(
        { name: 'Test', difficulty: 'junior', stackIds: ['1'] },
        mockUser,
      ),
    ).rejects.toThrow(
      'Not enough questions to meet the minimum required.',
    );
  });

  it('should create a template successfully with valid inputs', async () => {
    (stackRepo.findBy as jest.Mock).mockResolvedValue([
      { id: '1', name: 'React' },
    ]);
    (pointsConfigRepo.findOne as jest.Mock).mockResolvedValue({
      totalPoints: 50,
      minQuestions: 2,
    });
    (questionRepo.find as jest.Mock).mockResolvedValue([
      { id: 'q1', points: 20, difficulty: 'easy', stack: { id: '1' } },
      { id: 'q2', points: 30, difficulty: 'medium', stack: { id: '1' } },
    ]);

    const result = await service.createTemplate(
      { name: 'Valid Template', difficulty: 'junior', stackIds: ['1'] },
      mockUser,
    );

    expect(templateRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Valid Template',
        difficulty: 'junior',
        stacks: expect.any(Array),
        questions: expect.any(Array),
        createdBy: mockUser,
      }),
    );
    expect(templateRepo.save).toHaveBeenCalled();
    expect(result.id).toBe('template-1');
  });
});
