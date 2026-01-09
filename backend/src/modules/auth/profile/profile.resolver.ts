import { Args, Mutation, Resolver } from '@nestjs/graphql';
import type { User } from 'generated/prisma/client';
import { GraphQLUpload, type FileUpload } from 'graphql-upload-ts';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { Authorized } from 'src/shared/decorators/authorized.decorator';
import { FileValidationPipe } from 'src/shared/pipes/file-validation.pipe';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
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
}
