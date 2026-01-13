import { type MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { RawBodyMiddleware } from 'src/shared/middlewares/raw-body.middleware';
import { LivekitModule } from '../libs/livekit/livekit.module';
import { TelegramModule } from '../libs/telegram/telegram.module';
import { NotificationModule } from '../notification/notification.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [LivekitModule, PrismaModule, NotificationModule, TelegramModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {
  public configure(cosumer: MiddlewareConsumer) {
    cosumer.apply(RawBodyMiddleware).forRoutes({
      path: 'webhook/livekit',
      method: RequestMethod.POST,
    });
  }
}
