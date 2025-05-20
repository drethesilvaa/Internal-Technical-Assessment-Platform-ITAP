import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TestResult } from './test-result.entity';
import { Question } from './question.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class QuestionResult {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
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
