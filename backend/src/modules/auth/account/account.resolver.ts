import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { User } from 'generated/prisma/client';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { AccountService } from './account.service';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { CreateUserInput } from './inputs/create-user.input';
import { UserModel } from './models/user.model';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Query(() => UserModel, { name: 'findCurrentProfile' })
  public async getCurrentProfile(@Authorized('id') id: string) {
    return this.accountService.getCurrentProfile(id);
  }

  @Mutation(() => Boolean, { name: 'createUser' })
  public async create(@Args('data') data: CreateUserInput) {
    return this.accountService.create(data);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeEmail' })
  public async changeEmail(
    @Authorized() user: User,
    @Args('data') data: ChangeEmailInput,
  ) {
    return this.accountService.changeEmail(user, data);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changePassword' })
  public async changePassword(
    @Authorized() user: User,
    @Args('data') data: ChangePasswordInput,
  ) {
    return this.accountService.changePassword(user, data);
  }
}
