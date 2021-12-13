import {MikroORM} from "@mikro-orm/core";
import { __production__ } from "./constants";
import { Recipe } from "./entities/recipe";
import MikroConfig from "./mikro-orm.config"
import express from 'express' 
// import {ApolloServer} from 'apollo-server-express'

const MAIN = async() =>{

  const orm = MikroORM.init(MikroConfig);
  (await orm).getMigrator().up();
  const recipe =  (await  orm).em.create(
    Recipe,
      { name:'Roast Chicken',
        description:'It is a fkin chicken',
        direction: '',
        summary:'',
        ingredients:'',
    });
  (await orm).em.persistAndFlush(recipe)
  const app = express();
  app.listen(3000, ()=>{
    console.log('app is on 3000')
  })

}


MAIN().catch((err) => {
  console.log(err)
})

console.log('dirname', __dirname);

console.log('hello senpai')