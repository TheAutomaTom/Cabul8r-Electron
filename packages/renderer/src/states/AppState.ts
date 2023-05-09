import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Project";
import type { LineItem } from "../../../ipc-models/Takeoff/LineItem";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const Project = ref({
    projectName: "No project loaded", projectClient: "No project loaded"
  } as Project);
  const LoadProjectFile = (project: Project) => Project.value = project;

  const focussedRow = ref({} as LineItem);
  const clipboardRow = ref({} as LineItem);

  const setRightClickFocus = (element: LineItem) => {
    console.log("_app.setRightClickFocus    : ", `${element.id}_${element.name}`);
    focussedRow.value = element;
  };

  const OnCopyRow = () => clipboardRow.value = focussedRow.value;

  const OnPasteRowSibling = (element: LineItem) => {
    // if(focussedRow.value.lineItems == null){
    //   focussedRow.value.lineItems = [];
    // }
    // focussedRow.value.lineItems.push(element);
    console.log("OnPasteRowSibling... ", element);
  };

  const OnPasteRowChild = (lineItems: LineItem[] = Project.value.takeoff?.lineItems ) => {
    console.log("OnPasteRowChild... ");

    for(const item of lineItems){
      console.log(`lineItems.forEach... ${item.id}.${item.name}}`);

      if(item.id == focussedRow.value.id){
        if(item.lineItems == null){
          item.lineItems = [];
        }
        const newRow = createNewIds(clipboardRow.value);
        console.log(`lineItems.push...   ${newRow.id}.${newRow.name}` );
        item.lineItems.push(newRow);
        console.log("Updated Model..." );
        console.dir(Project.value);
        break;
      } else if (item.lineItems != null){
        OnPasteRowChild(item.lineItems);
      }
    }
  };


  const createNewIds = (lineItem: LineItem): LineItem => {
    const li = JSON.parse(JSON.stringify(lineItem)) as LineItem;
    li.id= crypto.randomUUID();

    if( li.lineItems != null ){
      li.lineItems.forEach((i) => {
        console.log(`createNewIds.lineItems... ${i.id}..${i.name}}`);
        i.id = crypto.randomUUID();
        if( i.lineItems){
          console.log(`Recalling createNewIds...count... ${i.lineItems.length}`);
          createNewIds(i);
        }
      });
    }
    return li;
  };

  return {
    IsLoading,
    IsScrolled,
    Project,
    LoadProjectFile,
    setRightClickFocus,
    OnCopyRow,
    OnPasteRowSibling,
    OnPasteRowChild
  };
});
