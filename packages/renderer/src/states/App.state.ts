import { ref } from "vue";
import { defineStore } from "pinia";
// import type { Project } from "../../../ipc-models/Takeoff/Project";
// import { LineItem } from "../../../ipc-models/Takeoff/LineItem";
import { useProjectState } from "./Project.state";
import { usePriceBookState } from "./PriceBook.state";

export const useAppState = defineStore("AppState", () => {

  const Project$= useProjectState();
  const PriceBook$= usePriceBookState();

  //= Private Methods ==>
  //...

  //= Properties ==>
  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  //= Public Methods ==>
  //...




  return {
    Project$,
    PriceBook$,
    IsLoading,
    IsScrolled
  };
});

