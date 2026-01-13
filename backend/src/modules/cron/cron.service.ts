import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StorageService } from 'src/core/libs/storage/storage.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { MailService } from '../libs/mail/mail.service';
import { TelegramService } from '../libs/telegram/telegram.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly storageService: StorageService,
    private readonly telegramService: TelegramService,
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
        avatar: true,
        telegramId: true,
        notificationSettings: {
          select: {
            telegramNotifications: true,
          },
        },
        stream: {
          select: {
            thumbnailUrl: true,
          },
        },
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
          if (user.avatar) {
            await this.storageService.remove(user.avatar);
          }

          if (user.stream?.thumbnailUrl) {
            await this.storageService.remove(user.stream.thumbnailUrl);
          }

          await this.mailService.sendAccountDeletionEmail(user.email);

          if (
            user.notificationSettings?.telegramNotifications &&
            user.telegramId
          ) {
            await this.telegramService.sendAccountDeletedMessage(
              user.telegramId,
            );
          }
        } catch (error) {
          this.logger.error(
            `Failed to process account deletion for ${user.email}:`,
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
