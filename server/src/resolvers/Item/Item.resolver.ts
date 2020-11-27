import { Resolver, Mutation, Args, Ctx, Authorized, Query } from 'type-graphql';
import { AddItemInputs, ItemResponse, Categoires } from './inputs';
import Item from '../../entities/Item';
import * as errors from './errors';
import Category from '../../entities/Category';
import { Context } from '../../types/context';
import UserCategories from '../../entities/UserCategories';
import { getConnection } from 'typeorm';

@Resolver(Item)
class ItemResolver {
  @Authorized()
  @Mutation(() => ItemResponse)
  async addItem(@Args() body: AddItemInputs, @Ctx() { req }: Context): Promise<ItemResponse> {
    if (!body.name || !body.categoryName) {
      return {
        error: errors.EmptyItemInputs,
      };
    }
    let category = await Category.findOne({ where: { name: body.categoryName } });

    if (!category) {
      category = await Category.create({ name: body.categoryName }).save();
    }

    const userCategory = await UserCategories.findOne({
      where: { userId: req.user.id, categoryId: category.id },
    });

    if (!userCategory) {
      await UserCategories.create({ userId: req.user.id, categoryId: category.id }).save();
    }

    const item = await Item.create({
      ...body,
      categoryId: category.id,
      userId: req.user.id,
    }).save();

    return { item };
  }

  @Authorized()
  @Query(() => Categoires, { nullable: true })
  async getCategoires(@Ctx() { req }: Context): Promise<Categoires> {
    const categoires = await getConnection()
      .getRepository(UserCategories)
      .createQueryBuilder('uc')
      .leftJoinAndSelect('uc.category', 'category')
      .select('category.id,category.name')
      .where('uc.userId = :id', { id: req.user.id })
      .getRawMany();

    return { categoires };
  }
}

export default ItemResolver;
