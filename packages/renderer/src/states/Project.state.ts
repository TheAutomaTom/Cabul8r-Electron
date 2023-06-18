import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "../../../ipc-models/Project";
import { ItemModel } from "../../../ipc-models/Manifest/ItemModel";

export const useProjectState = defineStore("ProjectState", () => {

  //= Private Methods ==>

  const createLineItem = (lineItem= new ItemModel("...") ): ItemModel => {
    const li = JSON.parse(JSON.stringify(lineItem)) as ItemModel;
    li.uuid= crypto.randomUUID();

    if( li.subitems != null ){
      li.subitems.forEach((i) => {
        i.uuid = crypto.randomUUID();
        if( i.subitems){
          createLineItem(i);
        }
      });
    }
    return li;
  };

  const reassignIds = ( subitems: ItemModel[] = Project.value.manifest ) => {
    Project.value.uuid = crypto.randomUUID();
    for(const li of subitems){
      li.uuid = crypto.randomUUID();
      if(li.subitems){
        reassignIds(li.subitems);
      }
    }
  };

  //= Properties ==>
  const HighlightedRow = ref({} as ItemModel);
  const Project = ref({
    uuid: "x",
    name: "No project loaded...",
    client: "No client loaded...",
    manifest: [] as ItemModel[]
  } as Project);
  const focussedRow = ref({} as ItemModel);
  const clipboardRow = ref({} as ItemModel);
  const isCutMode = ref(false);


  //= Public Methods ==>
  const LoadProjectFile = (project: Project) => {
    reassignIds(project.manifest);
    Object.assign(Project.value, project);
  };

  const SetRightClickFocus = (element: ItemModel) => {
    focussedRow.value = element;
  };

  const OnAddRowSibling = ( subitems: ItemModel[] = Project.value.manifest ) => {
    for(const item of subitems){
      if(item.uuid == focussedRow.value.uuid){
        const newRow = createLineItem();
        subitems.push(newRow);
        break;
      } else if (item.subitems != null){
        OnAddRowSibling(item.subitems);
      }
    }
  };

  const OnAddRowChild = ( subitems: ItemModel[] = Project.value.manifest ) => {
    for(const item of subitems){
      if(item.uuid == focussedRow.value.uuid){
        if(item.subitems == null){
          item.subitems = [];
        }
        const newRow = createLineItem();
        item.subitems.push(newRow);
        break;
      } else if (item.subitems != null){
        OnAddRowChild(item.subitems);
      }
    }
  };

  const OnCopyRow = () => { clipboardRow.value = focussedRow.value; isCutMode.value = false; };
  const OnSelectCutRow = ()  => { clipboardRow.value = focussedRow.value; isCutMode.value = true; };

  const OnDeleteRow = ( subitems: ItemModel[] = Project.value.manifest  ) => {
    for(const item of subitems){
      if(item.uuid == focussedRow.value.uuid){
        const index = subitems.indexOf(focussedRow.value);
        if (index > -1) { // only splice array when item is found
          subitems.splice(index, 1); // 2nd parameter means remove one item only
        }
        break;
      } else if (item.subitems != null){
        OnDeleteRow(item.subitems);
      }
    }
  };

  const OnDeleteCutRow = ( subitems: ItemModel[] = Project.value.manifest  ) => {
    for(const item of subitems){

      if(item.uuid == clipboardRow.value.uuid){
        const index = subitems.indexOf(clipboardRow.value);
        if (index > -1) { // only splice array when item is found
          subitems.splice(index, 1); // 2nd parameter means remove one item only
        }
        break;
      } else if (item.subitems != null){
        OnDeleteCutRow(item.subitems);
      }
    }
  };

  const OnPasteRowSibling = ( subitems: ItemModel[] = Project.value.manifest ) => {
    for(const item of subitems){
      if(item.uuid == focussedRow.value.uuid){
        const newRow = createLineItem(clipboardRow.value);
        subitems.push(newRow);
        if(isCutMode.value == true) OnDeleteCutRow();
        break;
      } else if (item.subitems != null){
        OnPasteRowSibling(item.subitems);
      }
    }
  };

  const OnPasteRowChild = ( subitems: ItemModel[] = Project.value.manifest ) => {
    for(const item of subitems){
      if(item.uuid == focussedRow.value.uuid){
        if(item.subitems == null){
          item.subitems = [];
        }
        const newRow = createLineItem(clipboardRow.value);
        item.subitems.push(newRow);
        if(isCutMode.value == true)OnDeleteCutRow();
        break;
      } else if (item.subitems != null){
        OnPasteRowChild(item.subitems);
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
