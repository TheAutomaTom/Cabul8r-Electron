import type { Atom } from "./Atom";

export class Molecule {
  constructor(description = "...", qty = 1 ) {
    this.uuid = crypto.randomUUID();
    this.description = description;
    this.quantity = qty;
  }
  uuid: string;
  description: string;
  quantity: number;
  atoms?: Atom[];
  molecules?: Molecule[];
}
