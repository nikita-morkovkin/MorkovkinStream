import { Inject, Injectable } from '@nestjs/common';
import {
  IngressClient,
  RoomServiceClient,
  WebhookReceiver,
} from 'livekit-server-sdk';
import {
  LIVE_KIT_OPTIONS_SYMBOL,
  type TypeLiveKitOptions,
} from './types/livekit.types';

@Injectable()
export class LivekitService {
  private roomService: RoomServiceClient;
  private ingressClient: IngressClient;
  private webHooksReceiver: WebhookReceiver;

  public constructor(
    @Inject(LIVE_KIT_OPTIONS_SYMBOL)
    private readonly options: TypeLiveKitOptions,
  ) {
    this.roomService = new RoomServiceClient(
      this.options.apiUrl,
      this.options.apiKey,
      this.options.apiSecret,
    );

    this.ingressClient = new IngressClient(
      this.options.apiUrl,
      this.options.apiKey,
      this.options.apiSecret,
    );

    this.webHooksReceiver = new WebhookReceiver(
      this.options.apiUrl,
      this.options.apiSecret,
    );
  }

  public get receiver(): WebhookReceiver {
    return this.createProxy(this.webHooksReceiver);
  }

  public get room(): RoomServiceClient {
    return this.createProxy(this.roomService);
  }

  public get ingress(): IngressClient {
    return this.createProxy(this.ingressClient);
  }

  private createProxy<T extends object>(target: T) {
    return new Proxy(target, {
      get: (obj, prop) => {
        const value = obj[prop as keyof T];

        if (typeof value === 'function') {
          // It is not an error, don't recommend to change this part of the code
          return value.bind(obj);
        }

        return value;
      },
    });
  }
}
