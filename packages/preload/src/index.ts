/**
 * @module preload
 */

// 1. import modules used in ipc... 
import { readFile } from "node:fs/promises";

// 2. encapsulate types...
import type { UserData } from "../../ipc-models/UserData";

// 3. exports may be called in renderer...
function getUserData(): Promise<UserData> {
  return readFile(`${process.cwd()}/testData/testData.json`, {encoding:"utf8"}).then(JSON.parse);
}

export { getUserData };

export {sha256sum} from "./nodeCrypto";
export {versions} from "./versions";
