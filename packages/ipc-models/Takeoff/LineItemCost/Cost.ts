import type { CostType } from "./CostType";

export class Cost {
  constructor(typeOfCost: CostType, cost: number, description = "...") {
    this.id = crypto.randomUUID();
    this.cost = cost;
    this.typeOfCost = typeOfCost;
    this.description = description;
  }
  id: string;
  typeOfCost: CostType;
  cost: number;
  description: string;
}
