import { browserWindow } from "./../mainWindow";
import type { Project } from "./../../../ipc-models/Project";
import { pickDirectory, pickFile } from "./appMenuFunctions";
import { readFile } from "node:fs/promises";
import { SetSavePath } from "../mainState";
import { SessionData } from "../sessionData";

let project = {} as Project;
const sessionData = new SessionData();

const appMenuTemplate = [
  {
    label: "File",
    submenu:[{
      label: "Open...",
      click: async function() {
        const _filePath = await pickFile();
        sessionData.recentFilePath = _filePath as string;
        if (_filePath === null) return;

        try{
          const data = await readFile(_filePath, "utf8");
          project = JSON.parse(data);
        } catch (err) {
          throw err as Error;
        }
        browserWindow?.webContents.send("on-load-project-file", project);
      }
    },
    {
      label: "Save as...",
      click: async function() {
        const _filePath = await pickDirectory();
        sessionData.recentFilePath = _filePath as string;
        if (_filePath === null) return;
        SetSavePath(_filePath as string);
        browserWindow?.webContents.send("on-save-project-file", _filePath);
      }
    },
    {
      label: "Save",
      // enabled: sessionData.recentFilePath != "",
      click: async function() {
        const _filePath = sessionData.recentFilePath;
        sessionData.recentFilePath = _filePath as string;
        SetSavePath(_filePath as string);
        browserWindow?.webContents.send("on-save-project-file", _filePath);
      }
    }
  ]
  },
  {
    label: "Window",
    submenu:[{
      label: "Home",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "");
      }
    },
    {
      label: "Manifest",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "manifest");
      }
    },
    {
      label: "Quark Book",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "price-book");
      }
    }
  ]
  }
];

export { appMenuTemplate };


