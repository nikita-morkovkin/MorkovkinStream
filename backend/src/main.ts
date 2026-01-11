import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { CoreModule } from './core/core.module';
import { createSessionMiddleware } from './core/middlewares/session.middleware';
import { RedisService } from './core/redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule, { rawBody: true });
  const redis = app.get(RedisService);
  const config = app.get(ConfigService);
  const applicationPort = config.getOrThrow<number>('APPLICATION_PORT');
  const allowedOrigins = config.getOrThrow<string>('ALLOWED_ORIGINS');
  const cookiesSecret = config.getOrThrow<string>('COOKIES_SECRET');

  app.use(cookieParser(cookiesSecret));
  app.use(
    graphqlUploadExpress({
      maxFileSize: 10 * 1024 * 1024,
      maxFiles: 10,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(createSessionMiddleware(config, redis));

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  });

  await app.listen(applicationPort);
}

void bootstrap();
