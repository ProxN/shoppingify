import { Resolver, Mutation, Args, Arg } from 'type-graphql';
import { AddItemInputs, ItemResponse } from './inputs';
import Item from '../../entities/Item';
import * as errors from './errors';
import Category from '../../entities/Category';
import UserCategories from '../../entities/UserCategories';

@Resolver(Item)
class ItemResolver {
  @Mutation(() => ItemResponse)
  async addItem(@Args() body: AddItemInputs): Promise<ItemResponse> {
    if (!body.name || !body.categoryId) {
      return {
        error: errors.EmptyItemInputs,
      };
    }
    const item = await Item.create({
      ...body,
      userId: '086dcf9c-3507-45e5-af2b-1f23432ebf17',
    }).save();

    return { item };
  }

  @Mutation(() => Category)
  async addCategory(@Arg('name') name: string): Promise<Category> {
    let category = await Category.findOne({ where: { name } });

    if (!category) {
      category = await Category.create({
        name,
      }).save();
    }

    await UserCategories.create({
      categoryId: category.id,
      userId: '086dcf9c-3507-45e5-af2b-1f23432ebf17',
    }).save();

    return category;
  }
}

export default ItemResolver;
