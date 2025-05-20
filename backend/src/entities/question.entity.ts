import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TestTemplate } from './test-template.entity';

export type QuestionType = 'code' | 'mcq' | 'text';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TestTemplate, (template) => template.questions)
  template: TestTemplate;

  @Column()
  type: QuestionType;

  @Column()
  difficulty: string;

  @Column()
  points: number;

  @Column('text')
  content: string;
}
