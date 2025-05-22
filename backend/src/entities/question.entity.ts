import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TestTemplate } from './test-template.entity';
import { QuestionOption } from './question-option.entity';
import { Stack } from './stack.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  
  @Column()
  content: string;

  @Column()
  type: 'code' | 'mcq' | 'text';

  @Column()
  difficulty: 'easy' | 'medium' | 'hard';

  @Column()
  points: number;

  @Column({ type: 'text', nullable: true }) // used for text/code
  correctAnswer: string;

  @ManyToOne(() => Stack, { eager: true })
  stackId: Stack;

  @ManyToOne(() => TestTemplate, (template) => template.questions, {
    nullable: true,
  })
  template: TestTemplate;

  @OneToMany(() => QuestionOption, (option) => option.question, {
    cascade: true,
    eager: true,
  })
  options: QuestionOption[];
}
