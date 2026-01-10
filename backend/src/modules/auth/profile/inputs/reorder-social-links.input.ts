import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class ReorderSocialLinksInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  public id: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  public position: number;
}
