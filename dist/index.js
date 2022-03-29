"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const users_1 = require("./resolvers/users");
const posts_1 = require("./resolvers/posts");
const cors_1 = __importDefault(require("cors"));
const ioredis_1 = __importDefault(require("ioredis"));
const typeorm_1 = require("typeorm");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const Users_1 = require("./entities/Users");
const Post_1 = require("./entities/Post");
const MAIN = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'tasteofbukkake2 ',
        username: "simonzhang",
        password: "admin",
        logging: true,
        synchronize: true,
        entities: [Post_1.Post, Users_1.Users]
    });
    const app = (0, express_1.default)();
    let RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    let redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTTL: true,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__production__,
        },
        saveUninitialized: false,
        secret: "keyboard cat",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [posts_1.PostResolver, hello_1.Hello, users_1.UserResolver],
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
//# sourceMappingURL=index.js.map