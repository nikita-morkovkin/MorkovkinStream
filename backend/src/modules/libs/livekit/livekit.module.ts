import { type DynamicModule, Module } from '@nestjs/common';
import { LivekitService } from './livekit.service';
import {
  LIVE_KIT_OPTIONS_SYMBOL,
  type TypeLiveKitAsyncOptions,
  type TypeLiveKitOptions,
} from './types/livekit.types';

@Module({})
export class LivekitModule {
  public static register(options: TypeLiveKitOptions): DynamicModule {
    return {
      module: LivekitModule,
      providers: [
        {
          provide: LIVE_KIT_OPTIONS_SYMBOL,
          useValue: options,
        },
        LivekitService,
      ],
      exports: [LivekitService],
      global: true,
    };
  }

  public static registerAsync(options: TypeLiveKitAsyncOptions): DynamicModule {
    return {
      module: LivekitModule,
      imports: options.imports || [],
      providers: [
        {
          provide: LIVE_KIT_OPTIONS_SYMBOL,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        LivekitService,
      ],
      exports: [LivekitService],
      global: true,
    };
  }
}
