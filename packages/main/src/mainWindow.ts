import {app, BrowserWindow, ipcMain, Menu, MenuItem } from "electron";
import {join} from "node:path";
import {URL} from "node:url";
import { contextMenuItems } from "./ContextMenu/contextMenuTemplate";

let contextFocus = "";

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

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
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

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  /// Context Menu...
  // eslint-disable-next-line prefer-const
  let contextMenu = new Menu();
  contextMenuItems.forEach( (item) => {
    contextMenu.append(item);
  });
  contextMenu.append(
    new MenuItem({
      id: "context-focus-item",
      enabled: false,
      label: `Handle ${contextFocus.toString()}`,
      submenu:[
        {
          label: "Copy",
          click: function(){
            contextMenu.items.forEach( (item) => {
              if (item.id == "context-focus-item") {
                item.enabled = false;
                item.label = "-";
              }
            });
          }
        },
        {
          label: "Paste",
          click: function(){/*handlePaste(param)*/}
        },
        {
          label: "Delete",
          click: function(){/*handleDelete(param)*/}
        }
      ]
    })
  );
  ipcMain.on("handle-set-context", function(_: any, param: string){
    contextFocus = param;
    contextMenu.items.forEach( (item) => {
      if (item.id == "context-focus-item") {
        item.label = `Handle ${contextFocus.toString()}`;
        item.enabled = true;
      }
    });
  });

  window.webContents.on("context-menu", function(_, _params){
    contextMenu.popup();
  });
/// ...context menu.

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
  });


  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
export {browserWindow};
