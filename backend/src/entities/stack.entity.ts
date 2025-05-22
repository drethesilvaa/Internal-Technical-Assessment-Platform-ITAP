import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TestTemplate } from './test-template.entity';
import { TestAssignment } from './test-assignment.entity';
import { Question } from './question.entity';

@Entity()
export class Stack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => TestTemplate, (template) => template.stack)
  templates: TestTemplate[];

  @OneToMany(() => TestAssignment, (assignment) => assignment.stack)
  assignments: TestAssignment[];
}
