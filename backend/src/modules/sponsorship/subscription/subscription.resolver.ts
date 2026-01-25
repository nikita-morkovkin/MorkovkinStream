import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type { SponsorshipSubscription, User } from 'generated/prisma/client';
import { UserModel } from 'src/modules/auth/account/models/user.model';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { SubscriptionModel } from './models/subscription.model';
import { SubscriptionService } from './subscription.service';

@Resolver(() => SubscriptionModel)
export class SubscriptionResolver {
  public constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Query(() => [SubscriptionModel], { name: 'findAllMySponsors' })
  @Authorization()
  public async findAllMySponsors(@Authorized() user: User) {
    return this.subscriptionService.findMySponsors(user);
  }

  @ResolveField(() => UserModel)
  public user(
    @Parent() subscription: SponsorshipSubscription & { subscriber: User },
  ) {
    return subscription.subscriber;
  }
}
