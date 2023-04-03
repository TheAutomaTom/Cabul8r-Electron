import { browserWindow } from "./../mainWindow";
import type { Project } from "./../../../ipc-models/Takeoff/Takeoff";


import { pickFile } from "./appMenuFunctions";
const fs = require("fs");
let project = {} as Project;

const appMenuTemplate = [
  {
    label: "File",
    submenu:[{
      label: "Open File...",
      click: async function() {
        const _filePath = await pickFile();
        if (_filePath === null) return;

        fs.readFile(_filePath, "utf8", (err: unknown, data: unknown) => {
          console.dir(data);
          project = JSON.parse(data as string);
        });
        browserWindow!.webContents.send("load-project-file", project);
      }
    }]
  }
];


// const appMenuTemplate = [
//   {
//     label: "FileX",
//     submenu:{
//       label: "Open File...",
//       click: function(){console.warn("word");} //pickFile()
//     }
//     // submenu: [
//     //   {
//     //     label: "Sub-Menu 1",
//     //     click: function(){
//     //       console.log(`Clicked Sub-menu 1!`)
//     //     }
//     //   },
//     //   {type: `separator`},
//     //   {
//     //     label: "sub-menu 2",
//     //   },
//     //   {
//     //     label: "sub-menu 3",
//     //   }
//     // ]

//   },
//   {
//     label: "EditX",
//     submenu: [
//       {role:"undo"},
//       {role:"redo"},
//       {role:"separator"},
//       {role:"cut"},
//       {role:"copy"},
//       {role:"paste"},
//       {role:"pasteAndMatchStyle"},
//       {role:"delete"},
//       {role:"selectAll"}
//     ]
//   },
//   {
//     label: "Example",
//     submenu: [
//       {
//         label: "Sub-Menu 1",
//         click: function(){
//           console.log("Clicked Sub-menu 1!");
//         }
//       },
//       {type: "separator"},
//       {
//         label: "sub-menu 2"
//       },
//       {
//         label: "sub-menu 3"
//       }
//     ]

//   },
//   {
//     label: "word",
//     submenu:[
//     {
//       label: "About the author",
//       click: function(){
//         electron.shell.openExternal("http://www.SurrealityCheck.org");
//       }
//     }
//   ] }
// ] as MenuItemConstructorOptions[];
export { appMenuTemplate };


