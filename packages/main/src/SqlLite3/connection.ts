import { CostCategory } from "./../../../ipc-models/Enums/CostCategory";
import { Quark } from "../../../ipc-models/Quark";
import { browserWindow } from "./../mainWindow";
import Database from "better-sqlite3";
import { UnitOfMeasurement } from "../../../ipc-models/Enums/UnitOfMeasurement";

const dbName = "2306181644";
const testTableName = "Costs";

export const db = new Database(`./${dbName}.db`);
db.pragma("journal_mode = WAL");

export const TryCreateDefaultTable = () => {
  const createTableQuery = db.prepare(`
  CREATE TABLE IF NOT EXISTS ${testTableName} (
    uuid TEXT PRIMARY KEY,
    category TEXT,
    uom TEXT,
    name TEXT,
    value INTEGER
    );`
  );
  const response = createTableQuery.run();

  // Seed table as required...
  let existingRows = getAllQuarks();
  if (existingRows?.length == 0) {
    seedQuarkTable();
    existingRows = getAllQuarks();
    console.log("[Sql] Checking db.Quark table is seeded...");
    console.dir(existingRows);
    if(existingRows?.length == 0) throw("[Sql] Quark table not prepared.");

  }
  return response;
};

const seedQuarkTable=()=>{
  InsertQuark(new Quark("aaa", CostCategory.MAT, UnitOfMeasurement.EA, "Pull, wire, 3-inch" ));
  InsertQuark(new Quark("bbb", CostCategory.LAB, UnitOfMeasurement.EA, "Pull installation"  ));
  InsertQuark(new Quark("ccc", CostCategory.MAT, UnitOfMeasurement.LF, "Cabinets per LF"    ));
  InsertQuark(new Quark("ddd", CostCategory.LAB, UnitOfMeasurement.EA, "Field per Day"      ));
};

export const InsertQuark = (quark: Quark) => {
  const query = db.prepare(`
    INSERT OR IGNORE INTO ${testTableName}(
      uuid,
      category,
      uom,
      name,
      value
    )
    VALUES (
      '${quark.uuid}',
      '${quark.category}',
      '${quark.uom}',
      '${quark.name}',
      '${quark.value *100}'
    );
  `);
  return query.run();
};

const getAllQuarks = (): Quark[] | undefined => {
  const query = db.prepare(`SELECT * FROM ${testTableName}`);
  try{
    const rows= query.all();
    const quarks = [] as Quark[];
    for(const row of rows as Quark[]){
      const quark = row;
      quarks.push( quark );
    }
    console.log("[Sql] getAllQuarks()...");
    console.dir(quarks);
    return quarks;
  } catch {
    return undefined;
  }

};

export const RefreshQuarkBook = () => {
  console.log("[Sql] connection.RefreshQuarkBook()...");
  const query = db.prepare(`SELECT * FROM ${testTableName}`);
  try{
    const rows= query.all() as Quark[];
    console.dir(rows);
    browserWindow?.webContents.send("on-refresh-quark-book", rows);
  } catch {
    throw("[Sql] connection.RefreshQuarkBook() error.");
  }
};

