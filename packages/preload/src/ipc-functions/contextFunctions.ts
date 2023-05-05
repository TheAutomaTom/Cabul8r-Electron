import { ipcRenderer } from "electron";

export const HandleRightClick = ( li: string ) => ipcRenderer.send("handle-set-context", li );

export const OnCopyRow          = (_: any) => ipcRenderer.on("on-copy-row", _ );
export const OnPasteRowSibling  = (_: any) => ipcRenderer.on("on-paste-row-sibling", _ );
export const OnPasteRowChild    = (_: any) => ipcRenderer.on("on-paste-row-child", _ );
export const OnDeleteRow        = (_: any) => ipcRenderer.on("on-delete-row", _ );

