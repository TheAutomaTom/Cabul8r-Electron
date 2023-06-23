/**
 * @module preload
*/

import { ipcRenderer } from "electron";

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

import {
  OnRefreshQuarkBook
} from "./ipc-functions/sqlFunctions";

const OnNavigateTo = (callback: any) =>
  ipcRenderer.on("on-navigate-to", callback);

// 2. encapsulate types...
// import type { UserData } from "../../ipc-models/UserData";

// 3. exports may be called in renderer...
// "unplugin-auto-expose" exports listener functions for #Renderer.

export {
  OnLoadProjectFile,
  OnSaveProjectFile, HandleSaveProjectFile,
  OnNavigateTo,
  HandleRightClick,
    OnCopyRow, OnCutRow, OnDeleteRow,
    OnPasteRowSibling, OnPasteRowChild,
    OnAddRowSibling, OnAddRowChild,
  OnRefreshQuarkBook
};
