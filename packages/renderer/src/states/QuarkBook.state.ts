import { defineStore } from "pinia";

import { ref } from "vue";

import type { Quark } from "../../../ipc-models/Quark";

export const usePriceBookState = defineStore("QuarkBookState", () => {

  //= Private Methods ==>
  //...

  //= Properties ==>
  const QuarkBook = ref([] as Quark[]);

  //= Public Methods ==>
  // ...

  return {
    QuarkBook
  };
});
