<script lang="ts" setup>
import { useAppState } from "./states/App.state";
import { onMounted } from "vue";
import {
  OnLoadProjectFile, OnSaveProjectFile, HandleSaveProjectFile,
  OnNavigateTo,
  OnDeleteRow, OnCopyRow, OnCutRow, OnPasteRowSibling, OnPasteRowChild,
  OnAddRowChild, OnAddRowSibling,
  OnRefreshQuarkBook
} from "#preload";
import router from "./infra/router";
import { Paths } from "./infra/defaultValues";
import type { Project } from "../../ipc-models/Project";
import type { Quark } from "../../ipc-models/Quark";

const app$ = useAppState();

function handleScroll() { app$.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  // Internal Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  // Inbound App Menu commands...
  window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) =>
    { app$.Prj$.LoadProjectFile(value); router.push(Paths.routeOnProjectLoad); }); });
  window.addEventListener("DOMContentLoaded", async () =>
  { OnSaveProjectFile((_: unknown, filePath: string) =>
    { HandleSaveProjectFile(filePath, JSON.stringify(app$.Prj$.Project, null, 2)); }); });

  // Inbound Context commands...
  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown)         => { app$.Prj$.OnCopyRow();         }); });
  window.addEventListener("DOMContentLoaded", () => { OnCutRow((_: unknown, _any: unknown)          => { app$.Prj$.OnCutRow();          }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowSibling((_: unknown, _any: unknown) => { app$.Prj$.OnPasteRowSibling(); }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowChild((_: unknown, _any: unknown)   => { app$.Prj$.OnPasteRowChild  (); }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowSibling((_: unknown, _any: unknown)   => { app$.Prj$.OnAddRowSibling();   }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowChild((_: unknown, _any: unknown)     => { app$.Prj$.OnAddRowChild();     }); });
  window.addEventListener("DOMContentLoaded", () => { OnNavigateTo((_: unknown, route: string)      =>
    { router.push(`/${route}`); }); });
  window.addEventListener("DOMContentLoaded", () => { OnDeleteRow((_: unknown, _any: unknown)       => { app$.Prj$.OnDeleteRow();       }); });

  // Inbound Sql commands...
  window.addEventListener("DOMContentLoaded", () => {
    OnRefreshQuarkBook((_: unknown, value: Quark[])    => {
      console.log("[App.vue] OnRefreshQuarkBook()...");
      console.dir(value);
      app$.OnRefreshQuarkBook(value);
    });
  });

});

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
