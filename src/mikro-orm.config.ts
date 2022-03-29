import { __production__ } from "./constants";
import { Post } from "./entities/Post";
import { Users } from "./entities/Users";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { EntityManager } from "@mikro-orm/postgresql";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  user: "simonzhang",
  password: "admin",
  entities: [Post, Users],
  dbName: "tasteofbukkake",
  em: EntityManager,
  type: "postgresql",
  debug: !__production__,
} as Parameters<typeof MikroORM.init>[0];
