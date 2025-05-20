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

@Entity()
export class TestAssignment {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToOne(() => User, (user) => user.testAssignments)
  candidate: User;

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
}
