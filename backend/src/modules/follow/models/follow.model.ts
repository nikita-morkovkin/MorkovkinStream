import { Field, ObjectType } from '@nestjs/graphql';
import { Follow } from 'generated/prisma/client';
import { UserModel } from 'src/modules/auth/account/models/user.model';

@ObjectType()
export class FollowModel implements Follow {
  @Field(() => String)
  public id: string;

  @Field(() => UserModel)
  public followingUser: UserModel;

  @Field(() => UserModel)
  public followerUser: UserModel;

  @Field(() => String)
  public followerId: string;

  @Field(() => String)
  public followingId: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
