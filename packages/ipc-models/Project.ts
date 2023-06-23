import type { Molecule } from "./Molecule";

export type Project = {
  uuid: string;
  name: string;
  client: string;
  molecules: Molecule[];
}

