import { Injectable } from '@nestjs/common';
import { TokenType, type User } from 'generated/prisma/client';
import {
  Action,
  Command,
  Ctx,
  InjectBot,
  Start,
  Update,
} from 'nestjs-telegraf';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { type SessionMetadata } from 'src/shared/types/session-metadata.types';
import { type Context, Telegraf } from 'telegraf';
import { MESSAGES } from './telegram-messages';
import { BUTTONS } from './telegram.buttons';

interface ExtendedContext extends Context {
  message: Context['message'] & { text?: string };
}

@Update()
@Injectable()
export class TelegramService {
  public constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly prismaService: PrismaService,
  ) {}

  @Start()
  public async onStart(@Ctx() ctx: ExtendedContext) {
    const chatId = ctx.chat?.id.toString();

    if (!chatId) {
      return;
    }

    const messageText = ctx.message?.text;
    const token = messageText ? messageText.split(' ')[1] : null;

    if (token) {
      const authToken = await this.prismaService.token.findUnique({
        where: {
          token,
        },
      });

      if (
        !authToken ||
        authToken.type !== TokenType.TELEGRAM_AUTH ||
        !authToken.userId
      ) {
        return await ctx.replyWithHTML(MESSAGES.invalidToken);
      }

      const hasExpired = new Date(authToken.expiresIn) < new Date();

      if (hasExpired) {
        return await ctx.replyWithHTML(MESSAGES.invalidToken);
      }

      await this.connectTelegram(authToken.userId, chatId);

      await this.prismaService.token.delete({
        where: {
          id: authToken.id,
        },
      });

      return await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess);
    }

    const user = await this.findUserByChatId(chatId);

    if (user) {
      return await this.onMe(ctx);
    }

    await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.authSuccess);
  }

  @Command('me')
  @Action('me')
  public async onMe(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();

    if (!chatId) {
      return;
    }

    const user = await this.findUserByChatId(chatId);

    if (!user) {
      return await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.authSuccess);
    }

    const followersCount = await this.prismaService.follow.count({
      where: {
        followingId: user.id,
      },
    });

    await ctx.replyWithHTML(
      MESSAGES.profile(user, followersCount),
      BUTTONS.profile,
    );
  }

  @Command('follows')
  @Action('follows')
  public async onFollows(@Ctx() ctx: Context) {
    const chatId = ctx.chat?.id.toString();

    if (!chatId) {
      return;
    }

    const user = await this.findUserByChatId(chatId);

    if (!user) {
      return await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.authSuccess);
    }

    const follows = await this.prismaService.follow.findMany({
      where: {
        followerId: user.id,
      },
      include: {
        following: true,
      },
    });

    if (user && follows.length) {
      const followsList = follows
        .map(follow => MESSAGES.follows(follow.following))
        .join('\n');

      const message = `<b> Каналы на которые вы подписаны: </b>\n\n\n${followsList}`;
      await ctx.replyWithHTML(message);
    } else {
      await ctx.replyWithHTML('<b>❌ У вас нет подписок</b>');
    }
  }

  public async sendPasswordResetToken(
    chatId: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    await this.bot.telegram.sendMessage(
      chatId,
      MESSAGES.resetPassword(token, metadata),
      {
        parse_mode: 'HTML',
      },
    );
  }

  public async sendDeactivateToken(
    chatId: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    await this.bot.telegram.sendMessage(
      chatId,
      MESSAGES.deactivateAccount(token, metadata),
      {
        parse_mode: 'HTML',
      },
    );
  }

  public async sendAccountDeletedMessage(chatId: string) {
    await this.bot.telegram.sendMessage(chatId, MESSAGES.accountDeleted(), {
      parse_mode: 'HTML',
    });
  }

  public async sendStreamStart(chatId: string, channel: User) {
    await this.bot.telegram.sendMessage(chatId, MESSAGES.streamStart(channel), {
      parse_mode: 'HTML',
    });
  }

  public async sendNewFollowing(chatId: string, channel: User) {
    const user = await this.findUserByChatId(chatId);

    if (!user) {
      return;
    }

    const followersCount = await this.prismaService.follow.count({
      where: {
        followingId: user.id,
      },
    });

    await this.bot.telegram.sendMessage(
      chatId,
      MESSAGES.newFollowing(channel, followersCount),
      {
        parse_mode: 'HTML',
      },
    );
  }

  private async connectTelegram(userId: string, chatId: string) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        telegramId: chatId,
      },
    });
  }

  private async findUserByChatId(chatId: string) {
    return await this.prismaService.user.findUnique({
      where: {
        telegramId: chatId,
      },
      include: {
        followers: true,
        followings: {
          include: {
            following: true,
          },
        },
      },
    });
  }
}
