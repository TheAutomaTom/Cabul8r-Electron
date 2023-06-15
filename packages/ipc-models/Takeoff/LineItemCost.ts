import type { CostOfLabor } from "./LineItemCost/CostOfLabor";
import type { CostOfMaterial } from "./LineItemCost/CostOfMaterial";

export class LineItemExpense {
  constructor(name = "...") {
    this.id= crypto.randomUUID();
    this.name= name;
    this.material= [];
    this.labor= [];
  }
  id: string;
  name: string;
  material: CostOfMaterial[];
  labor: CostOfLabor[];

  get materialCost() {
    let toReturn = 0;
    for(const item of this.material) {
      toReturn += item.amount;
    }
    return toReturn;
  }
  get laborCost() {
    let toReturn = 0;
    for(const item of this.labor) {
      toReturn += item.amount;
    }
    return toReturn;
  }
}


