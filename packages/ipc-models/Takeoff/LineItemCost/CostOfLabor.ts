import { Cost } from "./Cost";
import { CostKind } from "./CostKind";

export class CostOfLabor extends Cost{
  constructor(amount: number, name = "...") {
    super(CostKind.LAB, amount, name);
  }
}
