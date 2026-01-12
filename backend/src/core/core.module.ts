import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { DeactivateModule } from 'src/modules/auth/deactivate/deactivate.module';
import { PasswordRecoveryModule } from 'src/modules/auth/password-recovery/password-recovery.module';
import { ProfileModule } from 'src/modules/auth/profile/profile.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { TotpModule } from 'src/modules/auth/totp/totp.module';
import { VerificationModule } from 'src/modules/auth/verification/verification.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { ChannelModule } from 'src/modules/channel/channel.module';
import { ChatModule } from 'src/modules/chat/chat.module';
import { CronModule } from 'src/modules/cron/cron.module';
import { FollowModule } from 'src/modules/follow/follow.module';
import { LivekitModule } from 'src/modules/libs/livekit/livekit.module';
import { MailModule } from 'src/modules/libs/mail/mail.module';
import { IngressModule } from 'src/modules/stream/ingress/ingress.module';
import { StreamModule } from 'src/modules/stream/stream.module';
import { WebhookModule } from 'src/modules/webhook/webhook.module';
import { getGraphQLConfig } from './config/graphql.config';
import { getLiveKitConfig } from './config/livekit.config';
import { StorageModule } from './libs/storage/storage.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    PasswordRecoveryModule,
    DeactivateModule,
    TotpModule,
    RedisModule,
    AccountModule,
    SessionModule,
    VerificationModule,
    MailModule,
    StorageModule,
    ProfileModule,
    CronModule,
    StreamModule,
    IngressModule,
    WebhookModule,
    CategoryModule,
    ChatModule,
    FollowModule,
    ChannelModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LivekitModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getLiveKitConfig,
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getGraphQLConfig(configService),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
