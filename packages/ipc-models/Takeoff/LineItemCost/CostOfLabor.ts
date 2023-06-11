import { Cost } from "./Cost";
import { CostType } from "./CostType";

export class CostOfLabor extends Cost{
  constructor(cost: number, name = "...") {
    super(CostType.Lab, cost, name);
  }
}
