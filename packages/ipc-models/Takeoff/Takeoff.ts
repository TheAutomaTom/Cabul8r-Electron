import type { LineItem } from "./LineItem";


export type Takeoff = {
  id: string;
  takeoffName: string;
  reference: string;
  lineItems: LineItem[];
};
