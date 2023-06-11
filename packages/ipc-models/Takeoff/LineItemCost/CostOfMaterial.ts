import { Cost } from "./Cost";
import { CostType } from "./CostType";

export class CostOfMaterial extends Cost {
  constructor(cost: number, description = "...") {
    super(CostType.Mat, cost, description);
  }
}
