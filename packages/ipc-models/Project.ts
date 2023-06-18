import type { LineItem } from "./Manifest/LineItem";

export type Project = {
  uuid: string;
  name: string;
  client: string;
  lineItems: LineItem[];

}

