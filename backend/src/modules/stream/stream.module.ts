import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { StreamResolver } from './stream.resolver';
import { StreamService } from './stream.service';
import { IngressModule } from './ingress/ingress.module';

@Module({
  imports: [PrismaModule, IngressModule],
  providers: [StreamResolver, StreamService],
})
export class StreamModule {}
