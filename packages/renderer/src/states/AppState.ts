import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Project";
import type { LineItem } from "../../../ipc-models/Takeoff/LineItem";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const LoadProjectFile = (project: Project) => Project.value = project;

  const contextFocusRow = ref({} as LineItem);
  const clipboardRow = ref({} as LineItem);

  const setRightClickFocus = (element: LineItem) => {
    contextFocusRow.value = element;
  };

  const OnCopyRow = () => {
    clipboardRow.value = contextFocusRow.value;
  };

  const OnPasteRowSibling = () => {
    const pathToRow =  clipboardRow.value.id.split(".");
    console.dir(pathToRow);

    if(pathToRow.length == 1){
      Project.value.takeoff?.lineItems?.push(clipboardRow.value);
      return;
    }

    //let parent = Project.value.takeoff?.lineItems?.find(element => element.id == pathToRow[0]);



  };




  const Project = ref({
    projectName: "No project loaded", projectClient: "No project loaded"
  } as Project);

  return {
    IsLoading,
    IsScrolled,
    Project,
    LoadProjectFile,
    setRightClickFocus,
    OnCopyRow,
    OnPasteRowSibling
  };
});
