import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { User } from 'generated/prisma/client';
import { StreamModel } from '../../../stream/models/stream.model';
import { SocialLinkModel } from '../../profile/models/social-link.model';
import { FollowModel } from 'src/modules/follow/models/follow.model';

@ObjectType()
export class UserModel implements User {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public password: string;

  @Field(() => String)
  public username: string;

  @Field(() => String)
  public displayName: string;

  @Field(() => String, { nullable: true })
  public avatar: string | null;

  @Field(() => String, { nullable: true })
  public bio: string | null;

  @Field(() => Boolean)
  public isVerified: boolean;

  @Field(() => Boolean)
  public isEmailVerified: boolean;

  @Field(() => String)
  public streamId: string;

  @Field(() => StreamModel)
  public stream: StreamModel;

  @Field(() => Boolean)
  public isTotpEnabled: boolean;

  @Field(() => String, { nullable: true })
  public totpSecret: string | null;

  @Field(() => [SocialLinkModel])
  public socialLinks: SocialLinkModel[];

  @Field(() => Boolean)
  public isDeactivated: boolean;

  @Field(() => Date, { nullable: true })
  public deactivateAt: Date | null;

  @Field(() => [FollowModel])
  public followers: FollowModel[];

  @Field(() => [FollowModel])
  public followings: FollowModel[];

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
