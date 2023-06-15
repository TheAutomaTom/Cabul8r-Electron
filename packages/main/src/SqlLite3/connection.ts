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

  // Seed table as required...
  let existingRows = getAllCosts();
  if (existingRows?.length == 0) {
    seedCostTable();
    existingRows = getAllCosts();
    console.log("[Sql] Checking db.Cost table is seeded...");
    console.dir(existingRows);
    if(existingRows?.length == 0) throw("[Sql] Cost table not prepared.");

  }
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

export const getAllCosts = (): Cost[] | undefined => {
  const query = db.prepare(`SELECT * FROM ${testTableName}`);
  try{
    const rows= query.all();
    const costs = [] as Cost[];
    for(const row of rows as Cost[]){
      const cost = row;
      costs.push( cost );
    }
    console.log("[Sql] getAllCosts()...");
    console.dir(costs);
    return costs;
  } catch {
    return undefined;
  }

};

