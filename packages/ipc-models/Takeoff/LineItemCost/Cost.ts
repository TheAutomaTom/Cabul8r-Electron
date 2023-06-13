import type { CostKind } from "./CostKind";

export class Cost {
  constructor(typeOfCost: CostKind, amount: number, name = "...") {
    this.id = crypto.randomUUID();
    this.kind = typeOfCost;
    this.amount = amount;
    this.name = name;
  }
  id: string;
  kind: CostKind;
  amount: number;
  name: string;
  // overrideQuantity= false //Example: 1 freight charge for 300 pieces.
}
