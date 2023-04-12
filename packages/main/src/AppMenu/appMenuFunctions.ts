import { dialog } from "electron";

async function pickFile(): Promise<string | null> {
  return await dialog.showOpenDialog({properties: ["openFile"] })
    .then(function (response) {
      if(response.canceled) return null;
      return response.filePaths[0];
    });
  }

async function pickDirectory(): Promise<string | null | undefined> {
return await dialog.showSaveDialog({properties: ["showOverwriteConfirmation"]}) //.showOpenDialog({properties: ["openDirectory"] })
  .then(function (response) {
    if(response.canceled) return null;
    return response.filePath;
  });
}

export { pickFile, pickDirectory };
