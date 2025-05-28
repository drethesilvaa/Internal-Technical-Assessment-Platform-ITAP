import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { TestAssignment } from './test-assignment.entity';
import { TestTemplate } from './test-template.entity';
import { UserRole } from 'src/users/dto/create-user.dto';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: UserRole;

  @OneToMany(() => TestAssignment, (assignment) => assignment.createdBy)
  createdAssignments: TestAssignment[];

  @OneToMany(() => TestTemplate, (template) => template.createdBy)
  createdTemplates: TestTemplate[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  @BeforeUpdate()
  async hashUpdatedPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
