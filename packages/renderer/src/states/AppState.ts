import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Takeoff/Project";
import { LineItem } from "../../../ipc-models/Takeoff/LineItem";

export const useAppState = defineStore("AppState", () => {

  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  const focussedRow = ref({} as LineItem);
  const clipboardRow = ref({} as LineItem);
  const isCutMode = ref(false);

  const Project = ref({
    name: "No project loaded", projectClient: "No project loaded"
  } as Project);
  const LoadProjectFile = (project: Project) => Project.value = project;

  const SetRightClickFocus = (element: LineItem) => {
    focussedRow.value = element;
  };

  const OnAddRowSibling = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const newRow = createLineItem();
        lineItems.push(newRow);
        break;
      } else if (item.lineItems != null){
        OnAddRowSibling(item.lineItems);
      }
    }
  };

  const OnAddRowChild = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        if(item.lineItems == null){
          item.lineItems = [];
        }
        const newRow = createLineItem();
        item.lineItems.push(newRow);
        break;
      } else if (item.lineItems != null){
        OnAddRowChild(item.lineItems);
      }
    }
  };

  const OnCopyRow = () => { clipboardRow.value = focussedRow.value; isCutMode.value = false; };
  const OnSelectCutRow = ()  => { clipboardRow.value = focussedRow.value; isCutMode.value = true; };

  const OnDeleteRow = ( lineItems: LineItem[] = Project.value.lineItems  ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const index = lineItems.indexOf(focussedRow.value);
        if (index > -1) { // only splice array when item is found
          lineItems.splice(index, 1); // 2nd parameter means remove one item only
        }
        break;
      } else if (item.lineItems != null){
        OnDeleteRow(item.lineItems);
      }
    }
  };

  const OnDeleteCutRow = ( lineItems: LineItem[] = Project.value.lineItems  ) => {
    for(const item of lineItems){

      if(item.id == clipboardRow.value.id){
        const index = lineItems.indexOf(clipboardRow.value);
        if (index > -1) { // only splice array when item is found
          lineItems.splice(index, 1); // 2nd parameter means remove one item only
        }

        break;

      } else if (item.lineItems != null){
        OnDeleteCutRow(item.lineItems);
      }
    }
  };

  const OnPasteRowSibling = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const newRow = createLineItem(clipboardRow.value);
        lineItems.push(newRow);
        if(isCutMode.value == true) OnDeleteCutRow();
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
        const newRow = createLineItem(clipboardRow.value);
        item.lineItems.push(newRow);
        if(isCutMode.value == true)OnDeleteCutRow();
        break;
      } else if (item.lineItems != null){
        OnPasteRowChild(item.lineItems);
      }
    }
  };

  const createLineItem = (lineItem= new LineItem("...") ): LineItem => {
    const li = JSON.parse(JSON.stringify(lineItem)) as LineItem;
    li.id= crypto.randomUUID();

    if( li.lineItems != null ){
      li.lineItems.forEach((i) => {
        i.id = crypto.randomUUID();
        if( i.lineItems){
          createLineItem(i);
        }
      });
    }
    return li;
  };

  const HighlightedRow = ref({} as LineItem);


  return {
    IsLoading,
    IsScrolled,
    Project,
    HighlightedRow,
    LoadProjectFile,
    SetRightClickFocus,
    OnCopyRow,
    OnCutRow: OnSelectCutRow,
    OnDeleteRow,
    OnPasteRowSibling,
    OnPasteRowChild,
    OnAddRowSibling,
    OnAddRowChild
  };
});
