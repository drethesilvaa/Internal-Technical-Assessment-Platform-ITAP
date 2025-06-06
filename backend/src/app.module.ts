import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TemplatesModule } from './templates/templates.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TestsModule } from './tests/tests.module';
import { ResultsModule } from './results/results.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';
import { StacksModule } from './stacks/stacks.module';
import { QuestionsModule } from './questions/questions.module';
import { PointsConfigModule } from './points-config/points-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Loads .env automatically

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ❗ disable in production
    }),

    AuthModule,
    UsersModule,
    TemplatesModule,
    AssignmentsModule,
    TestsModule,
    ResultsModule,
    QuestionsModule,
    NotificationsModule,
    PointsConfigModule,
    SharedModule,
    StacksModule,
  ],
})
export class AppModule {}
