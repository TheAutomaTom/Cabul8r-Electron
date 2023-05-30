import type { LineItem } from "./LineItem";

export type Project = {
  id: string;
  name: string;
  projectClient: string;
  lineItems: LineItem[];

}

