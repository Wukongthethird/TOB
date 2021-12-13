import { __production__ } from "./constants";
import { Recipe } from "./entities/recipe";
import {MikroORM} from "@mikro-orm/core";
import path from "path";


export default {
  migrations:{
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files 
  },  
  entities: [Recipe], 
  dbName:"tasteofbukkake",
  type:'postgresql',
  debug: !__production__ ,
} as Parameters<typeof MikroORM.init>[0]; 