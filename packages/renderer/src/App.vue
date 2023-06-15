<script lang="ts" setup>
import { useAppState } from "./states/App.state";
import { onMounted, onUnmounted } from "vue";
import type { Project } from "../../ipc-models/Takeoff/Project";

import {
  OnLoadProjectFile, OnSaveProjectFile, HandleSaveProjectFile,
  OnCopyRow, OnCutRow, OnDeleteRow, OnPasteRowSibling, OnPasteRowChild, OnNavigateTo, OnAddRowChild, OnAddRowSibling,
  OnRefreshPriceBook
} from "#preload";
import router from "./infra/router";
import { defaults } from "./infra/defaultPaths";
import type { Cost } from "../../ipc-models/Takeoff/LineItemCost/Cost";

const app$ = useAppState();

function handleScroll() { app$.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  //Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  ///App Menu commands..
  window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) => { app$.Project$.LoadProjectFile(value); router.push(defaults.routeOnProjectLoad); }); });
  window.addEventListener("DOMContentLoaded", async () => { OnSaveProjectFile((_: unknown, filePath: string) => { HandleSaveProjectFile(filePath, JSON.stringify(app$.Project$.Project, null, 2)); }); });

  //Context commands...
  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown)         => { app$.Project$.OnCopyRow();         }); });
  window.addEventListener("DOMContentLoaded", () => { OnCutRow((_: unknown, _any: unknown)          => { app$.Project$.OnCutRow();          }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowSibling((_: unknown, _any: unknown) => { app$.Project$.OnPasteRowSibling(); }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowChild((_: unknown, _any: unknown)   => { app$.Project$.OnPasteRowChild  (); }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowSibling((_: unknown, _any: unknown)   => { app$.Project$.OnAddRowSibling();   }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowChild((_: unknown, _any: unknown)     => { app$.Project$.OnAddRowChild();     }); });
  window.addEventListener("DOMContentLoaded", () => { OnNavigateTo((_: unknown, route: string)      => { router.push(`/${route}`);          }); });
  window.addEventListener("DOMContentLoaded", () => { OnDeleteRow((_: unknown, _any: unknown)       => { app$.Project$.OnDeleteRow();       }); });

  // Sql commands...
  window.addEventListener("DOMContentLoaded", () => {
    OnRefreshPriceBook((_: unknown, value: Cost[])    => {
      console.log("[App.vue] OnRefreshPriceBook()...");
      console.dir(value);
      app$.OnRefreshPriceBook(value);
    });
  });

});

onUnmounted(() => { window.removeEventListener("scroll", handleScroll); });
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
