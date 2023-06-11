import type { CostOfLabor } from "./LineItemCost/CostOfLabor";
import type { CostOfMaterial } from "./LineItemCost/CostOfMaterial";

export class LineItemExpense {
  constructor(description= "...") {
    this.id= crypto.randomUUID();
    this.description= description;
    this.material= [];
    this.labor= [];
  }
  id: string;
  description: string;
  material: CostOfMaterial[];
  labor: CostOfLabor[];

  get materialCost() {
    let toReturn = 0;
    for(const item of this.material) {
      toReturn += item.cost;
    }
    return toReturn;
  }
  get laborCost() {
    let toReturn = 0;
    for(const item of this.labor) {
      toReturn += item.cost;
    }
    return toReturn;
  }
}


