import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { User } from 'generated/prisma/client';
import { GraphQLUpload, type FileUpload } from 'graphql-upload-ts';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { FileValidationPipe } from 'src/shared/pipes/file-validation.pipe';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { ReorderSocialLinksInput } from './inputs/reorder-social-links.input';
import { SocialLinkInput } from './inputs/social-link.input';
import { SocialLinkModel } from './models/social-link.model';
import { ProfileService } from './profile.service';

@Resolver('Profile')
export class ProfileResolver {
  public constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Boolean, { name: 'changeProfileAvatar' })
  @Authorization()
  public async changeProfileAvatar(
    @Authorized() user: User,
    @Args('avatar', { type: () => GraphQLUpload }, FileValidationPipe)
    avatar: FileUpload,
  ) {
    return await this.profileService.changeAvatar(user, avatar);
  }

  @Mutation(() => Boolean, { name: 'removeAvatar' })
  @Authorization()
  public async removeAvatar(@Authorized() user: User) {
    return await this.profileService.removeAvatar(user);
  }

  @Mutation(() => Boolean, { name: 'changeProfileInfo' })
  @Authorization()
  public async changeProfileInfo(
    @Authorized() user: User,
    @Args('data') data: ChangeProfileInfoInput,
  ) {
    return this.profileService.changeInfo(user, data);
  }

  @Mutation(() => Boolean, { name: 'createSocialLink' })
  @Authorization()
  public async createSocialLink(
    @Authorized() user: User,
    @Args('data') data: SocialLinkInput,
  ) {
    return this.profileService.createSocialLink(user, data);
  }

  @Mutation(() => Boolean, { name: 'reorderSocialLinks' })
  @Authorization()
  public async reorderSocialLinks(
    @Authorized() user: User,
    @Args('list', { type: () => [ReorderSocialLinksInput] })
    list: ReorderSocialLinksInput[],
  ) {
    return this.profileService.reorderSocialLinks(user, list);
  }

  @Mutation(() => Boolean, { name: 'updateSocialLink' })
  @Authorization()
  public async updateSocialLink(
    @Authorized() user: User,
    @Args('id') id: string,
    @Args('data') data: SocialLinkInput,
  ) {
    return this.profileService.updateSocialLink(user, id, data);
  }

  @Mutation(() => Boolean, { name: 'removeSocialLink' })
  @Authorization()
  public async removeSocialLink(
    @Authorized() user: User,
    @Args('id') id: string,
  ) {
    return this.profileService.removeSocialLink(user, id);
  }

  @Query(() => [SocialLinkModel], { name: 'findSocialLinks' })
  @Authorization()
  public async findSocialLinks(@Authorized() user: User) {
    return this.profileService.findLinks(user);
  }
}
