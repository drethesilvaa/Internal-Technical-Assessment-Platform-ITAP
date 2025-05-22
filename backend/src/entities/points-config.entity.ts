import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PointsConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  level: 'junior' | 'intermediate' | 'senior';

  @Column()
  totalPoints: number;

  @Column()
  minQuestions: number;
}
