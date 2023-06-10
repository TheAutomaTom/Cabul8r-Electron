import { UnitOfMeasurement } from "./UnitOfMeasurement";

export class LineItem {
  constructor(name: string, qty = 1, uom = UnitOfMeasurement.EA) {
    this.name = name;
    this.quantity = qty;
    this.uom = uom;
    this.id = crypto.randomUUID();

  }
  id: string;
  name: string;
  quantity: number;
  uom?: UnitOfMeasurement;
  lineItems?: LineItem[];

  // [JsonIgnore] decorator?
  // https://stackoverflow.com/questions/41685082/how-to-ignore-properties-sent-via-http/41685627#41685627
  // Maybe I can make the ignore list part of the class...
  isMarkedPath?: boolean;
}
