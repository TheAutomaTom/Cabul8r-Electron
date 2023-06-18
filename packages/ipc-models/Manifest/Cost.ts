import { UnitOfMeasurement } from "../Enums/UnitOfMeasurement";
import { CostCategory } from "../Enums/CostCategory";

export class Cost {
  public constructor(
    id: number,
    uuid = "",
    kind = CostCategory.MAT,
    uom = UnitOfMeasurement.EA,
    name = "...",
    amount = 0
  ) {
    this.id = id;
    // this.uuid = uuid == ""
    //   ? randomUUID()
    //   : uuid;
    this.uuid = uuid;
    this.kind = kind;
    this.uom = uom;
    this.name = name;
    this.amount = amount;
  }
  id: number;
  uuid: string;
  kind: string;
  uom: UnitOfMeasurement;
  name: string;
  amount: number;
  // overrideQuantity= false //Example: 1 freight charge for 300 pieces.
}
