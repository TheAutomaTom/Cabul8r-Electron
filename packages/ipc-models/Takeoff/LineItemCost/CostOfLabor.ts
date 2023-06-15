import { Cost } from "./Cost";
// import { CostKind } from "./CostKind";

export class CostOfLabor extends Cost{
  constructor(id:number, kind: string, amount: number, name = "LaborCost#") {
    super(id, kind, amount, name = `${name}${id}`);
  }
}
