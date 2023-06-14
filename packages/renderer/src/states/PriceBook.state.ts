// import { ref } from "vue";
import { defineStore } from "pinia";
import type { Cost } from "../../../ipc-models/Takeoff/LineItemCost/Cost";
import { ref } from "vue";

export const usePriceBookState = defineStore("PriceBookState", () => {

  //= Private Methods ==>
  //...

  //= Properties ==>
  const PriceBook = ref([] as Cost[]);

  //= Public Methods ==>
  //...

  return {
    PriceBook
  };
});
