import { defineStore } from "pinia";

import { ref } from "vue";

import type { Cost } from "../../../ipc-models/Takeoff/LineItemCost/Cost";

export const usePriceBookState = defineStore("PriceBookState", () => {

  //= Private Methods ==>
  //...

  //= Properties ==>
  const PriceBook = ref([] as Cost[]);

  //= Public Methods ==>
  // ...

  return {
    PriceBook
  };
});
