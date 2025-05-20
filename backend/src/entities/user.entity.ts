import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TestAssignment } from './test-assignment.entity';
import { TestTemplate } from './test-template.entity';
import { UserRole } from 'src/users/dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: UserRole;

  @OneToMany(() => TestAssignment, (assignment) => assignment.candidate)
  testAssignments: TestAssignment[];

  @OneToMany(() => TestAssignment, (assignment) => assignment.createdBy)
  createdAssignments: TestAssignment[];

  @OneToMany(() => TestTemplate, (template) => template.createdBy)
  createdTemplates: TestTemplate[];
}
