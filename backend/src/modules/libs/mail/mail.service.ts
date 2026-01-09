import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import type { SessionMetadata } from 'src/shared/types/session-metadata.types';
import AccountDeletionTemplate from './templates/account-deletion.template';
import DeactivateTemplate from './templates/deactivate.template';
import PasswordRecoveryTemplate from './templates/password-recovery.template';
import VerificationTemplate from './templates/verification.template';

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationToken(
    email: string,
    token: string,
  ): Promise<any> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(VerificationTemplate({ domain, token }));

    return this.sendEmail(email, 'Верификация аккаунта', html);
  }

  public async sendPasswordRecoveryToken(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ): Promise<any> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(
      PasswordRecoveryTemplate({ domain, token, metadata }),
    );

    return this.sendEmail(email, 'Сброс пароля аккаунта', html);
  }

  public async sendDeactivationEmail(
    email: string,
    metadata: SessionMetadata,
    token: string,
  ): Promise<any> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(DeactivateTemplate({ domain, metadata, token }));

    return this.sendEmail(email, 'Деактивация аккаунта', html);
  }

  public async sendAccountDeletionEmail(email: string): Promise<any> {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGINS');
    const html = await render(AccountDeletionTemplate({ domain }));

    return this.sendEmail(email, 'Аккаунт удален', html);
  }

  private sendEmail(
    email: string,
    subject: string,
    html: string,
  ): Promise<any> {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
