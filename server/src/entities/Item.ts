import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './Category';
import User from './User';

@ObjectType()
@Entity()
class Item extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  note?: string;

  @Field()
  @Column()
  userId!: string;

  @Field()
  @Column()
  categoryId?: string;

  @Field()
  @ManyToOne(() => Category)
  @JoinColumn()
  category!: string;

  @ManyToOne(() => User, (user) => user.items)
  user!: User;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;
  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;
}

export default Item;
