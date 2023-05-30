import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Project";
import type { LineItem } from "../../../ipc-models/Takeoff/LineItem";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const Project = ref({
    name: "No project loaded", projectClient: "No project loaded"
  } as Project);
  const LoadProjectFile = (project: Project) => Project.value = project;

  const focussedRow = ref({} as LineItem);
  const clipboardRow = ref({} as LineItem);

  const setRightClickFocus = (element: LineItem) => {
    console.log("_app.setRightClickFocus    : ", `${element.id}_${element.name}`);
    focussedRow.value = element;
  };

  const OnCopyRow = () => clipboardRow.value = focussedRow.value;
  const OnPasteRowSibling = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const newRow = createNewIds(clipboardRow.value);
        lineItems.push(newRow);
        break;
      } else if (item.lineItems != null){
        OnPasteRowSibling(item.lineItems);
      }
    }
  };

  const OnPasteRowChild = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        if(item.lineItems == null){
          item.lineItems = [];
        }
        const newRow = createNewIds(clipboardRow.value);
        item.lineItems.push(newRow);
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
