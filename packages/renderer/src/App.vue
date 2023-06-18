<script lang="ts" setup>
import { useAppState } from "./states/App.state";
import { onMounted } from "vue";
import {
  OnLoadProjectFile, OnSaveProjectFile, HandleSaveProjectFile,
  OnCopyRow, OnCutRow, OnDeleteRow, OnPasteRowSibling, OnPasteRowChild, OnNavigateTo, OnAddRowChild, OnAddRowSibling,
  OnRefreshPriceBook
} from "#preload";
import router from "./infra/router";
import { defaults } from "./infra/defaultPaths";
import type { Project } from "../../ipc-models/Project";
import type { Cost } from "../../ipc-models/Manifest/Cost";

const app$ = useAppState();

function handleScroll() { app$.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  // Internal Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  // Inbound App Menu commands...
  window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) => { app$.Project$.LoadProjectFile(value); router.push(defaults.routeOnProjectLoad); }); });
  window.addEventListener("DOMContentLoaded", async () => { OnSaveProjectFile((_: unknown, filePath: string) => { HandleSaveProjectFile(filePath, JSON.stringify(app$.Project$.Project, null, 2)); }); });

  // Inbound Context commands...
  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown)         => { app$.Project$.OnCopyRow();         }); });
  window.addEventListener("DOMContentLoaded", () => { OnCutRow((_: unknown, _any: unknown)          => { app$.Project$.OnCutRow();          }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowSibling((_: unknown, _any: unknown) => { app$.Project$.OnPasteRowSibling(); }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowChild((_: unknown, _any: unknown)   => { app$.Project$.OnPasteRowChild  (); }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowSibling((_: unknown, _any: unknown)   => { app$.Project$.OnAddRowSibling();   }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowChild((_: unknown, _any: unknown)     => { app$.Project$.OnAddRowChild();     }); });
  window.addEventListener("DOMContentLoaded", () => { OnNavigateTo((_: unknown, route: string)      => { router.push(`/${route}`);          }); });
  window.addEventListener("DOMContentLoaded", () => { OnDeleteRow((_: unknown, _any: unknown)       => { app$.Project$.OnDeleteRow();       }); });

  // Inbound Sql commands...
  window.addEventListener("DOMContentLoaded", () => {
    OnRefreshPriceBook((_: unknown, value: Cost[])    => {
      console.log("[App.vue] OnRefreshPriceBook()...");
      console.dir(value);
      app$.OnRefreshPriceBook(value);
    });
  });

});

</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
