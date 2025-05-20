import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(private mailerService: MailerService) {}

  async sendTestInvite(candidate: User, token: string, deadline: Date) {
    return this.mailerService.sendMail({
      to: candidate.email,
      subject: '🎓 You’ve been assigned a test!',
      template: 'test-invite',
      context: {
        name: candidate.name,
        token,
        deadline: deadline.toDateString(),
      },
    });
  }

  async sendReminder(candidate: User, deadline: Date) {
    return this.mailerService.sendMail({
      to: candidate.email,
      subject: '⏰ Reminder: Test deadline approaching!',
      template: 'reminder',
      context: {
        name: candidate.name,
        deadline: deadline.toDateString(),
      },
    });
  }

  async sendSubmissionConfirmation(candidate: User) {
    return this.mailerService.sendMail({
      to: candidate.email,
      subject: '✅ Test submitted successfully',
      template: 'submission-confirmed',
      context: {
        name: candidate.name,
      },
    });
  }
}
