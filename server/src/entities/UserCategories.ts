import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Category from './Category';
import User from './User';

@Entity()
class UserCategories extends BaseEntity {
  @PrimaryColumn('string')
  userId!: string;

  @PrimaryColumn('string')
  categoryId!: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category!: Category;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}

export default UserCategories;
