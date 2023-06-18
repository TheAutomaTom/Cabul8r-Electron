import type { ItemModel } from "./Manifest/ItemModel";

export type Project = {
  uuid: string;
  name: string;
  client: string;
  lineItems: ItemModel[];

}

