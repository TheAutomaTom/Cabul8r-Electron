/**
 * @module preload
 */

import { ipcRenderer } from "electron";


// 1. import modules used in ipc...
import { readFile } from "node:fs/promises";

// 2. encapsulate types...
import type { UserData } from "../../ipc-models/UserData";

// 3. exports may be called in renderer...
function getUserData(): Promise<UserData> {
  return readFile(`${process.cwd()}/testData/testData.json`, {encoding:"utf8"}).then(JSON.parse);
}

// This exports a listener function for the renderer to receive the file loaded from the main process.
// contextBridge.exposeInMainWorld("electronAPI", {
//   onLoadProjectFile: (callback: any) => ipcRenderer.on("load-project-file", callback)
// });
const onLoadProjectFile = (callback: any) => ipcRenderer.on("load-project-file", callback);


export { getUserData, onLoadProjectFile };

export {sha256sum} from "./nodeCrypto";
export {versions} from "./versions";
