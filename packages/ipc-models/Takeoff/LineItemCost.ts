import type { Cost } from "./LineItemCost/Cost";
export class LineItemCost {
  constructor(name = "...") {
    this.uuid= crypto.randomUUID();
    this.name= name;
    this.material= [];
    this.labor= [];
  }
  uuid: string;
  name: string;
  material: Cost[];
  labor: Cost[];

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


