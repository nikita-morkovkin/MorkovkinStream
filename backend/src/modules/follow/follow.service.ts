import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { User } from 'generated/prisma';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class FollowService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAllMyFollowings(user: User) {
    const myFollowings = await this.prismaService.follow.findMany({
      where: {
        followingId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        follower: true,
      },
    });

    return myFollowings;
  }

  public async findAllMyFollowers(user: User) {
    const myFollowers = await this.prismaService.follow.findMany({
      where: {
        followerId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        following: true,
      },
    });

    return myFollowers;
  }

  public async subscribeToChannel(user: User, channelId: string) {
    const channel = await this.prismaService.user.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      throw new NotFoundException('Канал не найден');
    }

    if (channel.id === user.id) {
      throw new ConflictException('Нельзя подписаться на самого себя');
    }

    const existingFollow = await this.prismaService.follow.findFirst({
      where: {
        followerId: user.id,
        followingId: channel.id,
      },
    });

    if (existingFollow) {
      throw new ConflictException('Вы уже подписаны на этот канал');
    }

    await this.prismaService.follow.create({
      data: {
        followerId: user.id,
        followingId: channel.id,
      },
    });

    return true;
  }

  public async unsubscribeFromChannel(user: User, channelId: string) {
    const channel = await this.prismaService.user.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      throw new NotFoundException('Канал не найден');
    }

    if (channel.id === user.id) {
      throw new ConflictException('Нельзя отписаться от самого себя');
    }

    const existingFollow = await this.prismaService.follow.findFirst({
      where: {
        followerId: user.id,
        followingId: channel.id,
      },
    });

    if (!existingFollow) {
      throw new ConflictException('Вы не подписаны на этот канал');
    }

    await this.prismaService.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });

    return true;
  }
}
