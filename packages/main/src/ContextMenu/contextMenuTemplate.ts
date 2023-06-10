import { MenuItem } from "electron";
import { browserWindow, contextMenu } from "../mainWindow";


const contextMenuItems = [

  new MenuItem({
    label: "Copy",
    click: function(){
      console.log("Copy!");
      browserWindow?.webContents.send("on-copy-row", "...");
      contextMenu.items.forEach( (item) => {
        if (item.id == "context-focus-item") {
          item.visible = item.enabled = false;
        }
      });
    }
  }),
  new MenuItem({
    label: "Cut",
    click: function(){
      console.log("Cut!");
      browserWindow?.webContents.send("on-cut-row", "...");
      contextMenu.items.forEach( (item) => {
        if (item.id == "context-focus-item") {
          item.visible = item.enabled = false;
        }
      });
    }
  }),
  new MenuItem({
    id: "paste-item",
    visible: true,
    enabled: true,
    label: "Paste...",
    submenu:[
      {
        label: "Paste as sibling",
        click: function(){
          console.log("Paste Sibling!");
          browserWindow?.webContents.send("on-paste-row-sibling", "...");
        }
      },
      {
        label: "Paste as child",
        click: function(){
          console.log("Paste Child!");
          browserWindow?.webContents.send("on-paste-row-child", "...");
        }
      }
    ]
  }),
  new MenuItem({
    id: "add-item",
    visible: true,
    enabled: true,
    label: "New...",
    submenu:[
      {
        label: "Add new sibling",
        click: function(){
          console.log("Main/ New Sibling!");
          browserWindow?.webContents.send("on-new-row-sibling", "...");
        }
      },
      {
        label: "Add new child",
        click: function(){
          console.log("Main/ New Child!");
          browserWindow?.webContents.send("on-new-row-child", "...");
        }
      }
    ]
  }),
  new MenuItem({
    label: "Delete",
    click: function(){
      console.log("Delete!");
      browserWindow?.webContents.send("on-delete-row", "...");
      contextMenu.items.forEach( (item) => {
        if (item.id == "context-focus-item") {
          item.visible = item.enabled = false;
        }
      });
    }
  })
];

export { contextMenuItems };
