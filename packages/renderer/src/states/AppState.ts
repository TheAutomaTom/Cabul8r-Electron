import { ref } from "vue";
import { defineStore } from "pinia";
// import type { Project } from "../../../ipc-models/Takeoff/Project";
// import { LineItem } from "../../../ipc-models/Takeoff/LineItem";
import { useProjectState } from "./Project.state";

export const useAppState = defineStore("AppState", () => {

  const Project$= useProjectState();

  //= Private Methods ==>
  //...

  //= Properties ==>
  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  //= Public Methods ==>
  //...




  return {
    Project$,
    IsLoading,
    IsScrolled
  };
});
