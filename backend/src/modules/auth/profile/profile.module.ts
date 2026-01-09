import { Module } from '@nestjs/common';
import { StorageModule } from 'src/core/libs/storage/storage.module';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [StorageModule, PrismaModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
