import { Query, Resolver } from 'type-graphql';

@Resolver()
class Hello {
  @Query(() => String)
  hello() {
    return 'Hello World';
  }
}

export default Hello;
