import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { UserAgent } from 'src/shared/decorators/user-agent.decorator';
import type { GqlContext } from 'src/shared/types/gql-context.types';
import { AuthModel } from '../account/models/auth.model';
import { LoginInput } from './inputs/login.input';
import { SessionModel } from './models/session.model';
import { SessionService } from './session.service';

@Resolver('Session')
export class SessionResolver {
  public constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Query(() => [SessionModel], { name: 'findSessionByUser' })
  public async findSessionsByUser(@Context() { req }: GqlContext) {
    return await this.sessionService.findByUser(req);
  }

  @Authorization()
  @Query(() => SessionModel, { name: 'findCurrentSession' })
  public findCurrentSession(@Context() { req }: GqlContext) {
    return this.sessionService.findCurrent(req);
  }

  @Mutation(() => AuthModel, { name: 'login' })
  public async login(
    @Context() { req }: GqlContext,
    @Args('data') data: LoginInput,
    @UserAgent() userAgent: string,
  ) {
    return this.sessionService.login(req, data, userAgent);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'logout' })
  public async logout(@Context() { req }: GqlContext) {
    return this.sessionService.logout(req);
  }

  @Mutation(() => Boolean, { name: 'clearSessionCookie' })
  public async clearSession(@Context() { req }: GqlContext) {
    return this.sessionService.clearSession(req);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeSession' })
  public async removeSession(
    @Context() { req }: GqlContext,
    @Args('id') id: string,
  ) {
    return this.sessionService.remove(req, id);
  }
}
