import { Field, ObjectType } from 'type-graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({})
  name!: string;
}

export default Category;
