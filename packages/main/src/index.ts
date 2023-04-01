import {app} from "electron";
import "./security-restrictions";
import {restoreOrCreateWindow} from "/@/mainWindow";
import {platform} from "node:process";
import * as electron from "electron";

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", restoreOrCreateWindow);

const menu = electron.Menu;
const appMenuBuilder = menu.buildFromTemplate( [
  {
    label: "FileX",
    submenu:[{
      label: "Open File...",

    click: function() {
      electron.dialog.showOpenDialog({properties: ["openFile"] })
      .then(function (response) {
        return response.canceled ? "" : response.filePaths[0];
      });
    }}]}
] );
menu.setApplicationMenu(appMenuBuilder);

/**
 * Install Vue.js dev tools or any other extension in development mode only.
*/
  if (import.meta.env.DEV) {
    const { app, session } = require("electron");
    const path = require("path");
    const os = require("os");

    // To get extension id go to `chrome://extensions/` and select dev tools extension, then look in address bar.
    // Next, check your version following the root path, into the extension.

    const basePath = "AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions";
    const extensionId = "\\nhdogjmejiglipccpnnnanhbledajbpd";
    const extensionVersion = "\\6.5.0_0";
    const vueDevToolsPath = path.join( os.homedir(), basePath, extensionId, extensionVersion );

    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(vueDevToolsPath);
    })
    .catch(e => console.error("Failed to install dev tools:", e));
  }

  /**
   * Create the application window when the background process is ready.
   */
  app
    .whenReady()
    .then(restoreOrCreateWindow)
    .catch(e => console.error("Failed create window:", e));

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import("electron-updater"))
    .then(module => {
      const autoUpdater =
        module.autoUpdater ||
        // @ts-expect-error Hotfix for https://github.com/electron-userland/electron-builder/issues/7338
        (module.default.autoUpdater as (typeof module)["autoUpdater"]);
      return autoUpdater.checkForUpdatesAndNotify();
    })
    .catch(e => console.error("Failed check and install updates:", e));
}
