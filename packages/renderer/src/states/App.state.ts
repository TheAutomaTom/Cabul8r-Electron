import { defineStore } from "pinia";
import { useProjectState } from "./Project.state";
import { usePriceBookState as useQuarkBookState } from "./QuarkBook.state";
import { css as CssDefaults } from "../infra/defaultValues";

import { ref } from "vue";

import type { Quark } from "../../../ipc-models/Quark";

export const useAppState = defineStore("AppState", () => {

  const Project$= useProjectState();
  const QuarkBook$= useQuarkBookState();

  //= Private Methods ==>
  //...

  //= Properties ==>
  const IsLoading = ref(true);
  const IsScrolled = ref(false);

  //= Public Methods ==>
  const OnRefreshQuarkBook = (quarks: Quark[]) =>{
    console.log("[QuarkBook$] OnRefreshQuarkBook...");
    console.dir(quarks);
    QuarkBook$.QuarkBook= quarks;
  };

  return {
    Prj$: Project$,
    PB$: QuarkBook$,
    IsLoading,
    IsScrolled,
    OnRefreshQuarkBook: OnRefreshQuarkBook,
    CssDefaults
  };
});

