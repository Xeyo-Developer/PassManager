import sqlite3 from "sqlite3";
import { join } from "path";

const appDatabase = new sqlite3.Database(join(process.cwd(), "databases/database.db"));

appDatabase.exec(`
    CREATE TABLE IF NOT EXISTS passwords (
        id          INTEGER         PRIMARY KEY AUTOINCREMENT,
        username    TEXT            NOT NULL,
        password    TEXT            NOT NULL,
        type        TINYINT(4)      NOT NULL
    )
`);

export { appDatabase };