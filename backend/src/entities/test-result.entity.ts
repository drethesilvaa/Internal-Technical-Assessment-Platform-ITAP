import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TestAssignment } from './test-assignment.entity';
import { QuestionResult } from './question-result.entity';

@Entity()
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TestAssignment, (assignment) => assignment.results)
  testAssignment: TestAssignment;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'float' })
  totalScore: number;

  @OneToMany(() => QuestionResult, (q) => q.testResult)
  questionResults: QuestionResult[];
}
