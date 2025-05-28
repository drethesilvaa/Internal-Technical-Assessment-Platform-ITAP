import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(private mailerService: MailerService) {}

  async sendTestInvite(
    candidateName: string,
    candidateEmail: string,
    token: string,
    deadline: Date,
  ) {
    return this.mailerService.sendMail({
      to: candidateEmail,
      subject: '🎓 You’ve been assigned a test!',
      template: 'test-invite',
      context: {
        name: candidateName,
        token,
        deadline: deadline.toDateString(),
      },
    });
  }

  async sendReminder(
    candidateName: string,
    candidateEmail: string,
    deadline: Date,
  ) {
    return this.mailerService.sendMail({
      to: candidateEmail,
      subject: '⏰ Reminder: Test deadline approaching!',
      template: 'reminder',
      context: {
        name: candidateName,
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
