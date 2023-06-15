import { Cost } from "./Cost";
// import { CostKind } from "./CostKind";

export class CostOfMaterial extends Cost {
  constructor(id:number, kind: string, amount: number, name = "MaterialCost#") {
    super(id, kind, amount, name = `${name}${id}`);
  }
}
