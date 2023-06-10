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
    console.log("_app.SetRightClickFocus    : ", `${element.id}_${element.name}`);
    focussedRow.value = element;
  };

  const OnAddRowSibling = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const newRow = createLineItem();
        lineItems.push(newRow);
        console.warn("newRow...");
        console.dir(newRow);
        break;
      } else if (item.lineItems != null){
        console.warn("Recursive call...");
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
        console.warn("newRow...");
        console.dir(newRow);
        item.lineItems.push(newRow);
        break;
      } else if (item.lineItems != null){
        console.warn("Recursive call...");
        OnAddRowChild(item.lineItems);
      }
    }
  };

  const OnCopyRow = () => { clipboardRow.value = focussedRow.value; isCutMode.value = false; };
  const OnCutRow = ()  => { clipboardRow.value = focussedRow.value; isCutMode.value = true; };

  // const OnDeleteRow = ( lineItems: LineItem[] = Project.value.lineItems  ) => {
  //   console.log("Begin OnDeleteRow...");
  //   for(const item of lineItems){
  //     console.log("OnDeleteRow...item.id ==", item.id);

  //     if(item.id == focussedRow.value.id){
  //       console.warn("OnDeleteRow...item.id == focussedRow.value.id ? ", item.id == focussedRow.value.id);
  //       const index = lineItems.indexOf(focussedRow.value);
  //       console.error("OnDeleteRow...index == ", index);
  //       if (index > -1) { // only splice array when item is found
  //         console.error("Splicing...");
  //         lineItems.splice(index, 1); // 2nd parameter means remove one item only
  //       }

  //       console.log("OnDeleteRow...break");
  //       break;

  //     } else if (item.lineItems != null){
  //       console.error("Recursive call...OnDeleteRow(...)");
  //       OnDeleteRow(item.lineItems);
  //     }
  //   }
  // };

  const OnDeleteRow = ( lineItems: LineItem[] = Project.value.lineItems  ) => {
    console.log("Begin OnDeleteRow...");
    for(const item of lineItems){
      console.log("OnDeleteRow...item.id ==", item.id);

      if(item.id == focussedRow.value.id){
        console.warn("OnDeleteRow...item.id == focussedRow.value.id ? ", item.id == focussedRow.value.id);
        const index = lineItems.indexOf(focussedRow.value);
        console.error("OnDeleteRow...index == ", index);
        if (index > -1) { // only splice array when item is found
          console.error("Splicing...");
          lineItems.splice(index, 1); // 2nd parameter means remove one item only
        }

        console.log("OnDeleteRow...break");
        break;

      } else if (item.lineItems != null){
        console.error("Recursive call...OnDeleteRow(...)");
        OnDeleteRow(item.lineItems);
      }
    }
  };

  // const onDeleteCutRow = (lineItems: LineItem[] = Project.value.lineItems  ): LineItem => {
  //   console.log("Begin onDeleteCutRow...");
  //   for(const item of lineItems){
  //     console.log("onDeleteCutRow...item.id ==", item.id);

  //     if(item.id == clipboardRow.value.id){
  //       console.warn("onDeleteCutRow...item.id == focussedRow.value.id ? ", item.id == clipboardRow.value.id);
  //       const index = lineItems.indexOf(clipboardRow.value);
  //       console.warn("onDeleteCutRow...index == ", index);
  //       if (index > -1) { // only splice array when item is found
  //         console.error("onDeleteCutRow Splicing...");
  //         lineItems.splice(index, 1); // 2nd parameter means remove one item only
  //         console.log("onDeleteCutRow...return");
  //         isCutMode.value = false;
  //         return item;
  //       }


  //     } else if (item.lineItems != null){
  //       console.error("Recursive call...onDeleteCutRow(...)");
  //       onDeleteCutRow(item.lineItems);
  //     }
  //   }
  // };

  const OnPasteRowSibling = ( lineItems: LineItem[] = Project.value.lineItems ) => {
    for(const item of lineItems){
      if(item.id == focussedRow.value.id){
        const newRow = createLineItem(clipboardRow.value);
        lineItems.push(newRow);
        //if(isCutMode.value == true){console.warn("Call onDeleteRow1"); OnDeleteRow(isCutMode);}
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
        //if(isCutMode.value == true){console.warn("Call onDeleteRow2"); OnDeleteRow(isCutMode);}
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
        console.log(`createNewIds.lineItems... ${i.id}..${i.name}}`);
        i.id = crypto.randomUUID();
        if( i.lineItems){
          console.log(`Recalling createNewIds...count... ${i.lineItems.length}`);
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
    OnCutRow,
    OnDeleteRow,
    OnPasteRowSibling,
    OnPasteRowChild,
    OnAddRowSibling,
    OnAddRowChild
  };
});
