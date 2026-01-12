import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { type User } from 'generated/prisma';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { FollowService } from './follow.service';
import { FollowModel } from './models/follow.model';

@Resolver('Follow')
export class FollowResolver {
  public constructor(private readonly followService: FollowService) {}

  @Authorization()
  @Query(() => [FollowModel], { name: 'findAllMyFollowers' })
  public async findMyFollowers(@Authorized() user: User) {
    return this.followService.findAllMyFollowers(user);
  }

  @Authorization()
  @Query(() => [FollowModel], { name: 'findAllMyFollowings' })
  public async findMyFollowings(@Authorized() user: User) {
    return await this.followService.findAllMyFollowings(user);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'subscribeToChannel' })
  public async subscribeToChannel(
    @Authorized() user: User,
    @Args('channelId') channelId: string,
  ) {
    return this.followService.subscribeToChannel(user, channelId);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'unsubscribeFromChannel' })
  public async unsubscribeFromChannel(
    @Authorized() user: User,
    @Args('channelId') channelId: string,
  ) {
    return this.followService.unsubscribeFromChannel(user, channelId);
  }
}
