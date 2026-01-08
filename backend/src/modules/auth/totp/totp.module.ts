import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { TotpResolver } from './totp.resolver';
import { TotpService } from './totp.service';

@Module({
  imports: [PrismaModule],
  providers: [TotpResolver, TotpService],
  exports: [TotpService],
})
export class TotpModule {}
