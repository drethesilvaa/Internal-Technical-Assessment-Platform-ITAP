import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TestResult } from './test-result.entity';
import { Question } from './question.entity';

@Entity()
export class QuestionResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TestResult, (result) => result.questionResults)
  testResult: TestResult;

  @ManyToOne(() => Question)
  question: Question;

  @Column('text')
  answer: string;

  @Column({ type: 'float' })
  score: number;

  @Column()
  timeSpent: number;

  @Column()
  tabSwitches: number;
}
