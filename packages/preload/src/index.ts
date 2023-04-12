/**
 * @module preload
*/

import { ipcRenderer } from "electron";

// 1. import modules used in ipc...
import { writeFile } from "node:fs/promises";

// 2. encapsulate types...
// import type { UserData } from "../../ipc-models/UserData";

// 3. exports may be called in renderer...
// function getUserData(): Promise<UserData> {
//   return readFile(`${process.cwd()}/testData/testData.json`, {encoding:"utf8"}).then(JSON.parse);
// }

// This exports a listener function for the renderer to receive the file loaded from the main process.
const onLoadProjectFile = (callback: any) => ipcRenderer.on("on-load-project-file", callback);

const onSaveProjectFile = (callback: any) => {
  ipcRenderer.on("on-save-project-file", callback);
};
const handleSaveProjectFile = ( filePath: string, project: string ) => {
  writeFile( filePath, project, {encoding:"utf8"} );
};

export { onLoadProjectFile, onSaveProjectFile, handleSaveProjectFile };

export {sha256sum} from "./nodeCrypto";
export {versions} from "./versions";
