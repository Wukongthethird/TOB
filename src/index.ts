
import { COOKIE_NAME, __production__ } from "./constants";
// import { Recipe } from "./entities/recipe";
import 'reflect-metadata'
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Hello } from "./resolvers/hello";
import { UserResolver } from "./resolvers/users";
import { PostResolver } from "./resolvers/posts";
import cors from "cors";
import Redis from "ioredis"
import { createConnection } from "typeorm";




// let redis = require("redis");

import session from "express-session";
import connectRedis from "connect-redis";
import { Users } from "./entities/Users";
import { Post } from "./entities/Post";


const MAIN = async () => {
  const conn = await createConnection({
    type:'postgres',
    database:'tasteofbukkake2',
    username: "simonzhang",
    password: "admin",
    logging:true,
    synchronize:true,
    entities:[Post , Users]

  });

  const app = express();
  let RedisStore = connectRedis(session);
  let redis = new Redis()


  app.use(
    cors({
      // origin: "http://localhost:3000",
      origin : "*",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __production__,
      },
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, Hello, UserResolver],
      validate: false,
    }),
    context: async ({ req, res }) => ({
      req,
      res,
      redis
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { origin: false },
  });

  app.listen(4000, () => {
    console.log("app is on 4000");
  });
};

MAIN().catch((err) => {
  console.log(err);
});
