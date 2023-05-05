import { ipcRenderer } from "electron";
import { writeFile } from "node:fs/promises";

export const OnLoadProjectFile = (callback: any) =>
  ipcRenderer.on("on-load-project-file", callback);

export const OnSaveProjectFile = (callback: any) =>
  ipcRenderer.on("on-save-project-file", callback);
export const HandleSaveProjectFile = ( filePath: string, project: string ) => {
  writeFile( filePath, project, {encoding:"utf8"} );
};
