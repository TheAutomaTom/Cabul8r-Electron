import { ipcRenderer } from "electron";
import { writeFile } from "node:fs/promises";

// #Renderer calls methods on #Preload and then events are sent to #Main
export const HandleSaveProjectFile = ( filePath: string, project: string ) => writeFile( filePath, project, {encoding:"utf8"} );

// #Main sends events to #Preload to call methods at #Renderer's App.vue
export const OnLoadProjectFile = (callback: any) => ipcRenderer.on("on-load-project-file", callback);
export const OnSaveProjectFile = (callback: any) => ipcRenderer.on("on-save-project-file", callback);
