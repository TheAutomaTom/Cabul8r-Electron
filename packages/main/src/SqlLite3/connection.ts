import { CostKind } from "./../../../ipc-models/Takeoff/LineItemCost/CostKind";
import { Cost } from "../../../ipc-models/Takeoff/LineItemCost/Cost";
import { browserWindow } from "./../mainWindow";
import Database from "better-sqlite3";
import { UnitOfMeasurement } from "../../../ipc-models/Takeoff/UnitOfMeasurement";

const dbName = "2306171018";
const testTableName = "Costs";

export const db = new Database(`./${dbName}.db`);
db.pragma("journal_mode = WAL");

export const TryCreateDefaultTable = () => {
  const createTableQuery = db.prepare(`
  CREATE TABLE IF NOT EXISTS ${testTableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT,
    kind TEXT,
    uom TEXT,
    name TEXT,
    amount INTEGER
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
  InsertCostRow(new Cost(-1, "", CostKind.MAT, UnitOfMeasurement.EA, "Pull, wire, 3-inch",  5.99   ));
  InsertCostRow(new Cost(-1, "", CostKind.LAB, UnitOfMeasurement.EA, "Pull installation" ,  15.50  ));
  InsertCostRow(new Cost(-1, "", CostKind.MAT, UnitOfMeasurement.LF, "Cabinets per LF"   ,  650.00 ));
  InsertCostRow(new Cost(-1, "", CostKind.LAB, UnitOfMeasurement.EA, "Field per Day"     ,  800.00 ));
};

export const InsertCostRow = (cost: Cost) => {
  const query = db.prepare(`
    INSERT OR IGNORE INTO ${testTableName}(
      uuid,
      kind,
      uom,
      name,
      amount
    )
    VALUES (
      '${cost.uuid}',
      '${cost.kind}',
      '${cost.uom}',
      '${cost.name}',
      '${cost.amount *100}'
    );
  `);
  return query.run();
};

const getAllCosts = (): Cost[] | undefined => {
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

export const RefreshPriceBook = () => {
  console.log("[Sql] connection.RefreshPriceBook()...");
  const query = db.prepare(`SELECT * FROM ${testTableName}`);
  try{
    const rows= query.all() as Cost[];
    console.dir(rows);
    browserWindow?.webContents.send("on-refresh-price-book", rows);
  } catch {
    throw("[Sql] connection.GetAllCostsString() error.");
  }
};

