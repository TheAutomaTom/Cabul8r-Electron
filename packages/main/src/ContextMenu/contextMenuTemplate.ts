import { MenuItem } from "electron";

const contextMenuItems = [
  new MenuItem({
    label: "Hello",
    click: function(){
      console.log("Context menu clicked!");
    }
  }),
  new MenuItem({
    label: "Goodbye",
    click: function(){
      console.log("Context menu clicked, again!");

    }
  })


];

export { contextMenuItems };
