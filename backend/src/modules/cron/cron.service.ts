import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from '../libs/mail/mail.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  // Delete deactivated accounts older than 7 days
  @Cron('0 0 0 * * *')
  public async deleteDeactivatedAccounts() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const deactivatedAccounts = await this.prismaService.user.findMany({
      where: {
        isDeactivated: true,
        deactivateAt: {
          lte: sevenDaysAgo,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (deactivatedAccounts.length === 0) {
      return;
    }

    this.logger.log(
      `Found ${deactivatedAccounts.length} deactivated accounts to delete.`,
    );

    await Promise.allSettled(
      deactivatedAccounts.map(async user => {
        try {
          await this.mailService.sendAccountDeletionEmail(user.email);
        } catch (error) {
          this.logger.error(
            `Failed to send account deletion email to ${user.email}:`,
            error instanceof Error ? error.message : error,
          );
        }
      }),
    );

    const userIds = deactivatedAccounts.map(user => user.id);

    try {
      const { count } = await this.prismaService.user.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      this.logger.log(`Successfully deleted ${count} deactivated accounts.`);
    } catch (error) {
      this.logger.error(
        'Failed to delete deactivated accounts from database:',
        error instanceof Error ? error.stack : error,
      );
    }
  }
}
