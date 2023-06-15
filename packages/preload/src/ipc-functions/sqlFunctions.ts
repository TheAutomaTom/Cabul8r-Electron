import { ipcRenderer } from "electron";

// #Renderer sends events to #Main
export const HandleRefreshPriceBook = ( ) => ipcRenderer.send("handle-refresh-price-book" );

// Send #Main events and responses back to #Renderer
export const OnRefreshPriceBook = ( callback: any ) => ipcRenderer.on("on-refresh-price-book", callback );
