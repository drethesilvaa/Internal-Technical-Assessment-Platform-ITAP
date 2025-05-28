import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { NotificationsService } from './notifications.service';
import { join } from 'path';
import * as fs from 'fs';

function resolveTemplatePath() {
  const devPath = join(process.cwd(), 'src/notifications/templates');
  const prodPath = join(__dirname, 'templates');

  return fs.existsSync(devPath) ? devPath : prodPath;
}

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PSW,
        },
      },
      defaults: {
        from: '"ITAP Platform" <noreply@demomailtrap.co>',
      },
      template: {
        dir: resolveTemplatePath(),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
