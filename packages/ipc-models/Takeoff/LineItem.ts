import type { LineItemCost } from "./LineItemCost";

export class LineItem {
  constructor(name = "...", qty = 1 ) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.quantity = qty;

  }
  uuid: string;
  name: string;
  quantity: number;
  cost?: LineItemCost;
  lineItems?: LineItem[];
}
