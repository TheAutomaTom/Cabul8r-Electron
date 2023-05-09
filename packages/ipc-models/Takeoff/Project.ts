import type { Takeoff } from "./Takeoff";

export type Project = {
  id: string;
  projectName: string;
  projectClient: string;
  takeoff: Takeoff;

}

