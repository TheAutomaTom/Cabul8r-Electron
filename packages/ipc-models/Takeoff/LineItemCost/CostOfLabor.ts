import { Cost } from "./Cost";
import { CostType } from "./CostType";

export class CostOfLabor extends Cost{
  constructor(cost: number, description = "...") {
    super(CostType.Lab, cost, description);
  }
}
