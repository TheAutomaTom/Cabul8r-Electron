import { UnitOfMeasurement } from "./Enums/UnitOfMeasurement";
import { CostCategory } from "./Enums/CostCategory";

export class Quark {
  public constructor(
    uuid = "",
    category = CostCategory.MAT,
    uom = UnitOfMeasurement.EA,
    name = "...",
    value = 0
  ) {
    this.uuid = uuid;
    this.category = category;
    this.uom = uom;
    this.name = name;
    this.value = value;
  }
  uuid: string;
  category: string;
  uom: UnitOfMeasurement;
  name: string;
  value: number;
  // overrideQuantity= false //Example: 1 freight charge for 300 pieces.
}
