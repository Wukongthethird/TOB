"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220223224620 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220223224620 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "users" add column "email" text not null;');
        this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    }
}
exports.Migration20220223224620 = Migration20220223224620;
//# sourceMappingURL=Migration20220223224620.js.map