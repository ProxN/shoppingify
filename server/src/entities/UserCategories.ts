import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Category from './Category';
import User from './User';

@ObjectType()
@Entity()
class UserCategories extends BaseEntity {
  @Field()
  @PrimaryColumn('string')
  userId!: string;

  @Field()
  @PrimaryColumn('string')
  categoryId!: string;

  @Field()
  @ManyToOne(() => Category)
  @JoinColumn()
  category!: Category;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;
}

export default UserCategories;
