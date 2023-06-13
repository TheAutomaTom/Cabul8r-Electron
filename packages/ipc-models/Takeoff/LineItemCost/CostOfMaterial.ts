import { Cost } from "./Cost";
import { CostKind } from "./CostKind";

export class CostOfMaterial extends Cost {
  constructor(amount: number, name = "...") {
    super(CostKind.MAT, amount, name);
  }
}
