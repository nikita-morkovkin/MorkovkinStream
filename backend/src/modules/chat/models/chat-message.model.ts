import { Field, ObjectType } from '@nestjs/graphql';
import { ChatMessage } from 'generated/prisma/client';
import { UserModel } from 'src/modules/auth/account/models/user.model';
import { StreamModel } from 'src/modules/stream/models/stream.model';

@ObjectType()
export class ChatMessageModel implements ChatMessage {
  @Field(() => String)
  public id: string;

  @Field(() => String)
  public text: string;

  @Field(() => String)
  public userId: string;

  @Field(() => UserModel)
  public user: UserModel;

  @Field(() => String)
  public streamId: string;

  @Field(() => StreamModel)
  public stream: StreamModel;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
