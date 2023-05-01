export type LineItem = {
  id: string;
  parent: string;
  name: string;
  reference: string;
  quantity: number;
  costs?: number; //Costs;
  uom?: UnitOfMeasurement;
  // lineItems?: LineItem[];
};

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

export enum UnitOfMeasurement
{
  EA,
  LF,
  SF,
  BF
}

