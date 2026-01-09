import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from 'src/modules/auth/account/account.module';
import { DeactivateModule } from 'src/modules/auth/deactivate/deactivate.module';
import { PasswordRecoveryModule } from 'src/modules/auth/password-recovery/password-recovery.module';
import { SessionModule } from 'src/modules/auth/session/session.module';
import { TotpModule } from 'src/modules/auth/totp/totp.module';
import { VerificationModule } from 'src/modules/auth/verification/verification.module';
import { CronModule } from 'src/modules/cron/cron.module';
import { MailModule } from 'src/modules/libs/mail/mail.module';
import { getGraphQLConfig } from './config/graphql.config';
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
    CronModule,
    ConfigModule.forRoot({
      isGlobal: true,
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
