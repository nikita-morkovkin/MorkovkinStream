import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { IngressResolver } from './ingress.resolver';
import { IngressService } from './ingress.service';

@Module({
  imports: [PrismaModule],
  providers: [IngressResolver, IngressService],
})
export class IngressModule {}
