// import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import {Redis} from 'ioredis'
interface MySession extends Session {
  userId?: string | number;
}

// interface MySessionData extends SessionData{
//   userId?: string|number
// }

export type MyContext = {
  req: Request & { session: MySession };
  res: Response;
  redis: Redis;
};
