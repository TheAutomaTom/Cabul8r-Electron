import type { Cost } from "./Cost";
import { CostCategory } from "../Enums/CostCategory";
// import { CostCategory } from "./LineItemCost/CostCategory";
export class ItemCostModel {
  constructor(name = "...") {
    this.uuid= crypto.randomUUID();
    this.name= name;
    this.costs= [];
  }
  uuid: string;
  name: string;
  costs: Cost[];

  // get materials() {
  //   return this.costs?.filter(cost => cost.kind == CostCategory.MAT);
  // }
  get materialCost(){
    let toReturn = 0;
    if(this.costs != undefined){
      for(const c of this.costs){
        if (c.kind == CostCategory.MAT){
          toReturn += c.amount;
        }
      }
    }
    console.log("materialCost()... ", toReturn);
    return toReturn;
  }
  // get labors() {
  //   return this.costs?.filter(cost => cost.kind == CostCategory.LAB);
  // }
  // get laborCost(){
  //   let toReturn = 0;
  //   if(this.costs != undefined){
  //     for(const c of this.costs){
  //       if (c.kind == CostCategory.LAB){
  //         toReturn += c.amount;
  //       }
  //     }
  //   }
  //   console.log("laborCost()... ", toReturn);
  //   return toReturn;
  // }
}


