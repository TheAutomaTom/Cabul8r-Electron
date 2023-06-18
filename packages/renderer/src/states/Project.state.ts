import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Project";
import { ItemModel } from "../../../ipc-models/Manifest/ItemModel";

export const useProjectState = defineStore("ProjectState", () => {

  //= Private Methods ==>

  const createLineItem = (lineItem= new ItemModel("...") ): ItemModel => {
    const li = JSON.parse(JSON.stringify(lineItem)) as ItemModel;
    li.uuid= crypto.randomUUID();

    if( li.lineItems != null ){
      li.lineItems.forEach((i) => {
        i.uuid = crypto.randomUUID();
        if( i.lineItems){
          createLineItem(i);
        }
      });
    }
    return li;
  };

  const reassignIds = ( lineItems: ItemModel[] = Project.value.lineItems ) => {
    Project.value.uuid = crypto.randomUUID();
    for(const li of lineItems){
      li.uuid = crypto.randomUUID();
      if(li.lineItems){
        reassignIds(li.lineItems);
      }
    }
  };

  //= Properties ==>
  const HighlightedRow = ref({} as ItemModel);
  const Project = ref({
    name: "No project loaded",
    client: "No client defined",
    lineItems: [
      createLineItem()
    ] as ItemModel[]
  } as Project);
  const focussedRow = ref({} as ItemModel);
  const clipboardRow = ref({} as ItemModel);
  const isCutMode = ref(false);


  //= Public Methods ==>
  const LoadProjectFile = (project: Project) => {
    reassignIds(project.lineItems);
    Object.assign(Project.value, project);
  };

  const SetRightClickFocus = (element: ItemModel) => {
    focussedRow.value = element;
  };

  const OnAddRowSibling = ( lineItems: ItemModel[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.uuid == focussedRow.value.uuid){
        const newRow = createLineItem();
        lineItems.push(newRow);
        break;
      } else if (item.lineItems != null){
        OnAddRowSibling(item.lineItems);
      }
    }
  };

  const OnAddRowChild = ( lineItems: ItemModel[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.uuid == focussedRow.value.uuid){
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

  const OnDeleteRow = ( lineItems: ItemModel[] = Project.value.lineItems  ) => {
    for(const item of lineItems){
      if(item.uuid == focussedRow.value.uuid){
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

  const OnDeleteCutRow = ( lineItems: ItemModel[] = Project.value.lineItems  ) => {
    for(const item of lineItems){

      if(item.uuid == clipboardRow.value.uuid){
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

  const OnPasteRowSibling = ( lineItems: ItemModel[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.uuid == focussedRow.value.uuid){
        const newRow = createLineItem(clipboardRow.value);
        lineItems.push(newRow);
        if(isCutMode.value == true) OnDeleteCutRow();
        break;
      } else if (item.lineItems != null){
        OnPasteRowSibling(item.lineItems);
      }
    }
  };

  const OnPasteRowChild = ( lineItems: ItemModel[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.uuid == focussedRow.value.uuid){
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







  return {
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
