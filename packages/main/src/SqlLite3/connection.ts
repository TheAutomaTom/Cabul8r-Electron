import Database from "better-sqlite3";

const dbName = "2306112133";
const testTableName = "Costs";

export const db = new Database(`./${dbName}.db`);
db.pragma("journal_mode = WAL");

export const TryCreateDefaultTable = () => {
  const createTableQuery = db.prepare(`
  CREATE TABLE IF NOT EXISTS ${testTableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind CHAR(3),
    amount INTEGER,
    name TEXT
    );`
  );
  const response = createTableQuery.run();

  return response;
};
