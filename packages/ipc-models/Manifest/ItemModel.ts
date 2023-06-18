import type { ItemCostModel } from "./ItemCostModel";

export class ItemModel {
  constructor(name = "...", qty = 1 ) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.quantity = qty;

  }
  uuid: string;
  name: string;
  quantity: number;
  cost?: ItemCostModel;
  lineItems?: ItemModel[];
}
