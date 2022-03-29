import { Query, Resolver } from "type-graphql";

@Resolver()
export class Hello {
  @Query(() => String)
  hello() {
    console.log(new Date());
    return "hello hello";
  }
}
