import type Redis from 'ioredis';
import type { RedisKey, RedisValue } from 'ioredis';

/**
 * Intercepts Redis SET commands to fix connect-redis v7+ [object Object] bug.
 * Converts object arguments like {EX: 3600} to proper Redis protocol ['EX', 3600].
 */
export function interceptRedisSetCommand(redisClient: Redis): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalSet = redisClient.set.bind(redisClient);

  redisClient.set = ((key: RedisKey, value: RedisValue, ...args: unknown[]) => {
    const validArgs = args.flatMap(arg => {
      if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
        const obj = arg as Record<string, unknown>;

        // Handle legacy format: {EX: number}
        if ('EX' in obj && typeof obj.EX === 'number') {
          return ['EX', obj.EX];
        }
        if ('PX' in obj && typeof obj.PX === 'number') {
          return ['PX', obj.PX];
        }

        // Handle new format: {expiration: {type: 'EX'|'PX', value: number}}
        if (
          'expiration' in obj &&
          typeof obj.expiration === 'object' &&
          obj.expiration !== null
        ) {
          const expiration = obj.expiration as Record<string, unknown>;
          if ('type' in expiration && 'value' in expiration) {
            const type = expiration.type as string;
            const value = expiration.value as number;
            if ((type === 'EX' || type === 'PX') && typeof value === 'number') {
              return [type, value];
            }
          }
        }

        console.error('[RedisService] Invalid SET arg:', arg);
        return [];
      }
      return [arg];
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return originalSet(key, value, ...validArgs);
  }) as typeof redisClient.set;
}
