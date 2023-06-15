import { defineStore } from "pinia";
import { useProjectState } from "./Project.state";
import { usePriceBookState } from "./PriceBook.state";

import { ref } from "vue";

import type { Cost } from "../../../ipc-models/Takeoff/LineItemCost/Cost";

export const useAppState = defineStore("AppState", () => {

  const Project$= useProjectState();
  const PriceBook$= usePriceBookState();

  //= Private Methods ==>
  //...

  //= Properties ==>
  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  //= Public Methods ==>
  const OnRefreshPriceBook = (costs: Cost[]) =>{
    console.log("[PriceBook$] OnRefreshPriceBook...");
    console.dir(costs);
    PriceBook$.PriceBook= costs;
  };

  return {
    Project$,
    PriceBook$,
    IsLoading,
    IsScrolled,
    OnRefreshPriceBook
  };
});

