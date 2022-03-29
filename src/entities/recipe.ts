import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Recipe {
  @PrimaryKey()
  id!: number;

  // @Property({type:'date', default:'NOW()'})
  // createdAt = new Date()

  // @Property({onUpdate: ()=>new Date() } )
  // updatedAt = new Date()

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  direction!: string;

  @Property()
  summary!: string;

  @Property()
  ingredients!: string;
}
