import Database from "better-sqlite3";

const dbName = "2306112133";
const _testTableName = "Costs";

export const db = new Database(`./${dbName}.db`);
db.pragma("journal_mode = WAL");
