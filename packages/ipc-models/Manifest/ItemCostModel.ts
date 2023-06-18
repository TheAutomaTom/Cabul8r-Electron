import type { Cost } from "./Cost";
import { CostCategory } from "../Enums/CostCategory";
export class ItemCostModel {
  constructor(name = "...") {
    this.uuid= crypto.randomUUID();
    this.name= name;
    this.costs= [];
  }
  uuid: string;
  name: string;
  costs: Cost[];

  get costOfMaterials(){
    let toReturn = 0;
    if(this.costs != undefined){
      for(const c of this.costs){
        if (c.category == CostCategory.MAT){
          toReturn += c.amount;
        }
      }
    }
    console.log("costOfMaterials()... ", toReturn);
    return toReturn;
  }

}


