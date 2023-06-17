import type { LineItem } from "./LineItem";

export type Project = {
  uuid: string;
  name: string;
  client: string;
  lineItems: LineItem[];

}

