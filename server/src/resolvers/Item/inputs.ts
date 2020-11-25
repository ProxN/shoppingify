import { ArgsType, Field, ObjectType } from 'type-graphql';
import Item from '../../entities/Item';
import { ErrorResponse } from '../types';

@ArgsType()
export class AddItemInputs {
  @Field()
  name!: string;

  @Field({ nullable: true })
  note?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field()
  categoryId!: string;
}

@ObjectType()
export class ItemResponse extends ErrorResponse {
  @Field(() => Item, { nullable: true })
  item?: Item;
}
