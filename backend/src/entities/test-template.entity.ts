import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { DifficultyLevel } from 'src/templates/dto/create-template.dto';

@Entity()
export class TestTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stack: string;

  @Column()
  difficulty: DifficultyLevel;

  @ManyToOne(() => User, user => user.createdTemplates)
  createdBy: User;

  @OneToMany(() => Question, question => question.template)
  questions: Question[];
}
