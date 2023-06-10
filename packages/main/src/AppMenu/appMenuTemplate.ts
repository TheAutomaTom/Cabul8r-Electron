import { browserWindow } from "./../mainWindow";
import type { Project } from "./../../../ipc-models/Takeoff/Project";
import { pickDirectory, pickFile } from "./appMenuFunctions";
import { readFile } from "node:fs/promises";
import { SetSavePath } from "../mainState";
import { SessionData } from "../SessionDate";

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
      label: "Native",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "takeoff");
      }
    },
    {
      label: "proto-one",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "proto-one");
      }
    },
    {
      label: "proto-two",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "proto-two");
      }
    },
    {
      label: "proto-three",
      click: async function() {
        browserWindow?.webContents.send("on-navigate-to", "proto-three");
      }
    }
  ]
  }
];

export { appMenuTemplate };


