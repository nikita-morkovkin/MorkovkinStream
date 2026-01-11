import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LivekitService } from '../libs/livekit/livekit.service';

@Injectable()
export class WebhookService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly livekitService: LivekitService,
  ) {}

  // Third param is temp - it can call an error with auth token and different times on servers
  public async receiveWebhookEvent(body: string, authorization: string) {
    const event = this.livekitService.receiver.receive(
      body,
      authorization,
      true,
    );

    if (event.event === 'ingress_started') {
      await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }

    if (event.event === 'ingress_ended') {
      await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo?.ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }
  }
}
