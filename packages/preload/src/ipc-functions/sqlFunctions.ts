import { ipcRenderer } from "electron";

// #Renderer calls methods on #Preload and then events are sent to #Main
export const HandleRefreshPriceBook = ( ) => ipcRenderer.send("handle-refresh-price-book" );

// #Main sends events to #Preload to call methods at #Renderer's App.vue
export const OnRefreshPriceBook = ( callback: any ) => ipcRenderer.on("on-refresh-price-book", callback );
