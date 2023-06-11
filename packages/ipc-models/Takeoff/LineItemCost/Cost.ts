import type { CostType } from "./CostType";

export class Cost {
  constructor(typeOfCost: CostType, cost: number, name = "...") {
    this.id = crypto.randomUUID();
    this.cost = cost;
    this.typeOfCost = typeOfCost;
    this.name = name;
  }
  id: string;
  typeOfCost: CostType;
  cost: number;
  name: string;
}
