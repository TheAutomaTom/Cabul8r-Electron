import { Cost } from "./Cost";
import { CostType } from "./CostType";

export class CostOfMaterial extends Cost {
  constructor(cost: number, name = "...") {
    super(CostType.Mat, cost, name);
  }
}
