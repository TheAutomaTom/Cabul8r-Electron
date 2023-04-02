import { dialog } from "electron";

async function pickFile(): Promise<string | null> {
  return await dialog.showOpenDialog({properties: ["openFile"] })
    .then(function (response) {
      if(response.canceled) return null;
      return response.filePaths[0];
    });
  }

export { pickFile};
