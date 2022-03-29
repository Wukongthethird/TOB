"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const Users_1 = require("./entities/Users");
const path_1 = __importDefault(require("path"));
const postgresql_1 = require("@mikro-orm/postgresql");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    user: "simonzhang",
    password: "admin",
    entities: [Post_1.Post, Users_1.Users],
    dbName: "tasteofbukkake",
    em: postgresql_1.EntityManager,
    type: "postgresql",
    debug: !constants_1.__production__,
};
//# sourceMappingURL=mikro-orm.config.js.map