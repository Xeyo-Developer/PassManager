import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const directoryPath: string = join(process.cwd(), "databases");
if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath);
};

const databasePath: string = join(process.cwd(), "databases/database.db");
if (!existsSync(databasePath)) {
    writeFileSync(databasePath, "", "utf-8");
};