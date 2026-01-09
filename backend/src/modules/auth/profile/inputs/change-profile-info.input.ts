import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@InputType({ description: 'Input type for changing user information' })
export class ChangeProfileInfoInput {
  @Field(() => String, {
    description:
      'Username: must start and end with a letter or digit, may contain a single hyphen (not at start/end). Example: username, username-user, username0, username-user0.',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)?$/, {
    message:
      'Имя пользователя должно начинаться и заканчиваться буквой или цифрой, может содержать один дефис (не в начале и не в конце), например: username, username-user, username0, username-user0.',
    context: {
      description:
        'Имя пользователя должно содержать только буквы, цифры и не более одного дефиса (не в начале и не в конце).',
    },
  })
  public username: string;

  @Field(() => String, { description: 'Display name of the user' })
  @IsNotEmpty()
  @IsString()
  public displayName: string;

  @Field(() => String, {
    description: 'User biography or description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  public bio?: string;
}
