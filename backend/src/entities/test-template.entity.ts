import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { DifficultyLevel } from 'src/templates/dto/create-template.dto';
import { Exclude } from 'class-transformer';
import { Stack } from './stack.entity';

@Entity()
export class TestTemplate {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Stack)
  @JoinTable()
  stacks: Stack[];

  @Column()
  difficulty: DifficultyLevel;

  @ManyToOne(() => User, (user) => user.createdTemplates)
  createdBy: User;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];
}
