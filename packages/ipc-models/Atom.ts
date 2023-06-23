import type { Quark } from "./Quark";
import { CostCategory } from "./Enums/CostCategory";
export class Atom {
  constructor(description = "...") {
    this.uuid= crypto.randomUUID();
    this.description= description;
    this.quarks= [];
  }
  uuid: string;
  description: string;
  quarks: Quark[];

  get costOfMaterials(){
    let toReturn = 0;
    if(this.quarks != undefined){
      for(const q of this.quarks){
        if (q.category == CostCategory.MAT){
          toReturn += q.value;
        }
      }
    }
    console.log("costOfMaterials()... ", toReturn);
    return toReturn;
  }

}


