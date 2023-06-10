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
  // reference: string;
  quantity: number;
  uom?: UnitOfMeasurement;
  // costs?: number; //Costs;
  lineItems?: LineItem[];

  // [JsonIgnore] decorator?
  // https://stackoverflow.com/questions/41685082/how-to-ignore-properties-sent-via-http/41685627#41685627
  // Maybe I can make the ignore list part of the class...
  isPathToDelete?: boolean;

}

// export type Costs =
// {
//   perSpec: number; //Cost;
//   // veOption: Cost;
//   uom: UnitOfMeasurement;
//   // equipmentRental: Cost;
// }

// export type Cost =
// {
//   fabrication: FabricationLabor;
//   installation: InstallationLabor;
// }

// export type FabricationLabor =
// {
//   measurement: number;
//   vendor: number;
//   waste: number;
//   finishing: number;
//   shopTime: number;
//   receiving: number;
//   delivery: number;
// }

// export type InstallationLabor =
// {
//   name: string;
//   cost: number;
// }

// export type EquipmentRental =
// {
//   title: number;
//   perDay: number;
//   perJob: number;
// }


