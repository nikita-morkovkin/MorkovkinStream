import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../auth/account/models/user.model';
import { ChannelService } from './channel.service';

@Resolver('Channel')
export class ChannelResolver {
  public constructor(private readonly channelService: ChannelService) {}

  @Query(() => [UserModel], { name: 'findRecommendedChannels' })
  public async findRecommendedChannels() {
    return await this.channelService.findRecommendChannels();
  }

  @Query(() => UserModel, { name: 'findChannelByUsername' })
  public async findByUsername(@Args('username') username: string) {
    return this.channelService.findByUsername(username);
  }

  @Query(() => Number, { name: 'findFollowersCountByChannel' })
  public async findCountByChannel(@Args('channelId') channelId: string) {
    return await this.channelService.findCountByChannel(channelId);
  }
}
