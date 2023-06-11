import { LineItemExpense as LineItemCost } from "./LineItem/LineItemCost";
import { UnitOfMeasurement } from "./LineItem/UnitOfMeasurement";

export class LineItem {
  constructor(name: string, qty = 1, uom = UnitOfMeasurement.EA) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.quantity = qty;
    this.uom = uom;
    this.expense = new LineItemCost();

  }
  id: string;
  name: string;
  quantity: number;
  uom?: UnitOfMeasurement;
  expense?: LineItemCost;
  lineItems?: LineItem[];
}
