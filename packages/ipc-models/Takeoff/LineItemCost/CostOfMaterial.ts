import { Cost } from "./Cost";

export class CostOfMaterial extends Cost {
  constructor(base: number, description = "...") {
    super(base, description);
  }
}
