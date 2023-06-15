import { app, BrowserWindow, ipcMain, Menu } from "electron";
import { join } from "node:path";
import { URL } from "node:url";
import { contextMenuItems } from "./ContextMenu/contextMenuTemplate";
import { RefreshPriceBook, TryCreateDefaultTable } from "./SqlLite3/connection";

let browserWindow: BrowserWindow | undefined;
async function createWindow() {
  browserWindow = new BrowserWindow({
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), "packages/preload/dist/index.cjs")
    }
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behavior with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();
    if (import.meta.env.DEV) { browserWindow?.webContents.openDevTools(); }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test.
   */
  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL("../renderer/dist/index.html", "file://" + __dirname).toString();

  await browserWindow.loadURL(pageUrl);
  return browserWindow;
}

function handleSetContext (event: any, contextId: string) {
  if(contextId == "") return;
  contextMenu.items.forEach( (item) => {
    if (item.id == "context-focus-item") {
      item.visible = item.enabled = true;
      // item.label = contextId; //Wht doesn't this work?
    }
  });
  contextMenu.popup();
}
const contextMenu = new Menu();
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());
  if (window === undefined) { window = await createWindow(); }

  // Events sent by #Renderer...
  ipcMain.on("handle-refresh-price-book", RefreshPriceBook);
  ipcMain.on("handle-set-context", handleSetContext);

  // ContextMenu...
  contextMenuItems.forEach( (item) => contextMenu.append(item) );

  // Prepare Sql...
  TryCreateDefaultTable();
  RefreshPriceBook();

  if (window.isMinimized()) { window.restore(); }
  window.focus();

}
export {browserWindow, contextMenu};
