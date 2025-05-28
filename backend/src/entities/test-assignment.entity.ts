import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { TestTemplate } from './test-template.entity';
import { TestResult } from './test-result.entity';
import { Exclude } from 'class-transformer';
import { Stack } from './stack.entity';

@Entity()
export class TestAssignment {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  candidateName: string;

  @Column()
  candidateEmail: string;

  @ManyToOne(() => TestTemplate)
  template: TestTemplate;

  @ManyToOne(() => User, (user) => user.createdAssignments)
  createdBy: User;

  @Column()
  status: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @OneToMany(() => TestResult, (result) => result.testAssignment)
  results: TestResult[];

  @ManyToOne(() => Stack, (stack) => stack.assignments, { eager: true })
  stack: Stack;
}
