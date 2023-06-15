// import type { CostKind } from "./CostKind";

export class Cost {
  public constructor(id: number, kind: string, amount: number, name = "...") {
    this.id = id; //crypto.randomUUID();
    this.kind = kind;
    this.amount = amount;
    this.name = name;
  }
  id: number;
  kind: string;
  amount: number;
  name: string;
  // overrideQuantity= false //Example: 1 freight charge for 300 pieces.
}
