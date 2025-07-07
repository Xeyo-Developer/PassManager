import sqlite3 from "sqlite3";
import { join } from "path";
import { app } from "electron";

const userDataPath = app.getPath('userData');
const dbPath = join(userDataPath, "database.db");

const appDatabase = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  }
});

appDatabase.exec(`
    CREATE TABLE IF NOT EXISTS passwords (
        id          INTEGER         PRIMARY KEY AUTOINCREMENT,
        username    TEXT            NOT NULL,
        password    TEXT            NOT NULL,
        type        INTEGER         NOT NULL
    )
`);

export { appDatabase };