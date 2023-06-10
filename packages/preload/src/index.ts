/**
 * @module preload
*/

// 1. import modules used in ipc (such as node:fs)...
import {
  OnLoadProjectFile,
  OnSaveProjectFile, HandleSaveProjectFile
} from "./ipc-functions/fileFunctions";
import {
  HandleRightClick,
  OnCopyRow, OnCutRow, OnDeleteRow,
  OnPasteRowSibling, OnPasteRowChild,
  OnAddRowSibling, OnAddRowChild
} from "./ipc-functions/contextFunctions";
import { ipcRenderer } from "electron";

const OnNavigateTo = (callback: any) =>
  ipcRenderer.on("on-navigate-to", callback);

// 2. encapsulate types...
// import type { UserData } from "../../ipc-models/UserData";

// 3. exports may be called in renderer...
// function getUserData(): Promise<UserData> {
//   return readFile(`${process.cwd()}/testData/testData.json`, {encoding:"utf8"}).then(JSON.parse);
// }

// This exports a listener function for the renderer to receive the file loaded from the main process.

export {
  OnLoadProjectFile,
  OnSaveProjectFile, HandleSaveProjectFile,
  OnNavigateTo,
  HandleRightClick,
    OnCopyRow, OnCutRow, OnDeleteRow,
    OnPasteRowSibling, OnPasteRowChild,
    OnAddRowSibling, OnAddRowChild
};
