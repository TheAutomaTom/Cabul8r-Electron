import { Cost } from "./Cost";

export class CostOfLabor extends Cost{
  constructor(base: number, description = "...") {
    super(base, description);
  }
}
