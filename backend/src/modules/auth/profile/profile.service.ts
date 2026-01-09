import { ConflictException, Injectable } from '@nestjs/common';
import type { User } from 'generated/prisma/client';
import { FileUpload } from 'graphql-upload-ts';
import sharp from 'sharp';
import { StorageService } from 'src/core/libs/storage/storage.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';

@Injectable()
export class ProfileService {
  public constructor(
    private readonly storageService: StorageService,
    private readonly prismaService: PrismaService,
  ) {}

  public async changeAvatar(user: User, file: FileUpload) {
    if (user.avatar) {
      await this.storageService.remove(user.avatar);
    }

    const chunks: Buffer[] = [];

    for await (const chunk of file.createReadStream() as AsyncIterable<Buffer>) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const fileName = `/channels/${user.username}.webp`;

    const processedBuffer = await sharp(buffer, {
      animated: file.filename.endsWith('.gif'),
    })
      .resize(512, 512)
      .webp()
      .toBuffer();

    await this.storageService.upload(processedBuffer, fileName, 'image/webp');

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: fileName,
      },
    });

    return true;
  }

  public async removeAvatar(user: User) {
    if (!user.avatar) {
      return;
    }

    await this.storageService.remove(user.avatar);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: null,
      },
    });

    return true;
  }

  public async changeInfo(user: User, input: ChangeProfileInfoInput) {
    const { username, displayName, bio } = input;

    const usernameExist = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (usernameExist && username !== user.username) {
      throw new ConflictException('Имя пользователя уже занято');
    }

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio,
        displayName,
        username,
      },
    });

    return true;
  }
}
