import { CostKind } from "./../../../ipc-models/Takeoff/LineItemCost/CostKind";
import { Cost } from "../../../ipc-models/Takeoff/LineItemCost/Cost";

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

    seedCostTable();
  return response;
};

const seedCostTable=()=>{
  InsertCostRow(new Cost(-1, CostKind.MAT.toString(), 5.99, "Pull, wire, 3-inch"));
  InsertCostRow(new Cost(-1, CostKind.LAB.toString(), 15.50, "Pull installation"));
  InsertCostRow(new Cost(-1, CostKind.MAT.toString(), 650, "Cabinets per LF"));
  InsertCostRow(new Cost(-1, CostKind.LAB.toString(), 800, "Field per Day"));
};

export const InsertCostRow = (cost: Cost) => {
  const query = db.prepare(`
    INSERT OR IGNORE INTO ${testTableName}(Kind, Amount, Name)
    VALUES ('${cost.kind}', '${cost.amount *100}', '${cost.name}');
  `);
  return query.run();
};
