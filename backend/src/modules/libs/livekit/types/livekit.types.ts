import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export const LIVE_KIT_OPTIONS_SYMBOL = Symbol('LiveKitOptionsSymbol');

export type TypeLiveKitOptions = {
  apiUrl: string;
  apiKey: string;
  apiSecret: string;
};

export type TypeLiveKitAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<TypeLiveKitOptions>, 'useFactory' | 'inject'>;
