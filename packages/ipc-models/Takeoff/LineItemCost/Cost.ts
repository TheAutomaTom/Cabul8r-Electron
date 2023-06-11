export class Cost {
  constructor(cost: number, vendor = "...", description = "...") {
    this.id = crypto.randomUUID();
    this.cost = cost;
    this.vendor = vendor;
    this.description = description;
  }
  id: string;
  cost: number;
  vendor: string;
  description: string;
}
