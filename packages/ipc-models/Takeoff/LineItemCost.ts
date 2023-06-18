import type { Cost } from "./LineItemCost/Cost";
import { CostKind } from "./LineItemCost/CostKind";
// import { CostKind } from "./LineItemCost/CostKind";
export class LineItemCost {
  constructor(name = "...") {
    this.uuid= crypto.randomUUID();
    this.name= name;
    this.costs= [];
  }
  uuid: string;
  name: string;
  costs: Cost[];




  // get materials() {
  //   return this.costs?.filter(cost => cost.kind == CostKind.MAT);
  // }
  get materialCost(){
    let toReturn = 0;
    if(this.costs != undefined){
      for(const c of this.costs){
        if (c.kind == CostKind.MAT){
          toReturn += c.amount;
        }
      }
    }
    console.log("materialCost()... ", toReturn);
    return toReturn;
  }
  // get labors() {
  //   return this.costs?.filter(cost => cost.kind == CostKind.LAB);
  // }
  // get laborCost(){
  //   let toReturn = 0;
  //   if(this.costs != undefined){
  //     for(const c of this.costs){
  //       if (c.kind == CostKind.LAB){
  //         toReturn += c.amount;
  //       }
  //     }
  //   }
  //   console.log("laborCost()... ", toReturn);
  //   return toReturn;
  // }
}


