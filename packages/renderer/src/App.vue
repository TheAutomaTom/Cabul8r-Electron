<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";
import type { Project } from "../../ipc-models/Takeoff/Project";

import { OnLoadProjectFile, OnSaveProjectFile, HandleSaveProjectFile, OnCopyRow, OnCutRow, OnDeleteRow, OnPasteRowSibling, OnPasteRowChild, OnNavigateTo, OnAddRowChild, OnAddRowSibling } from "#preload";
import router from "./infra/router";

const _app = useAppState();

function handleScroll() { _app.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  //Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  ///App Menu commands..
  window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) => { _app.LoadProjectFile(value); router.push("/takeoff/native-2"); }); });
  window.addEventListener("DOMContentLoaded", async () => { OnSaveProjectFile((_: unknown, filePath: string) => { HandleSaveProjectFile(filePath, JSON.stringify(_app.Project, null, 2)); }); });

  //Context commands
  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown)         => { _app.OnCopyRow();         }); });
  window.addEventListener("DOMContentLoaded", () => { OnCutRow((_: unknown, _any: unknown)          => { _app.OnCutRow();          }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowSibling((_: unknown, _any: unknown) => { _app.OnPasteRowSibling(); }); });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowChild((_: unknown, _any: unknown)   => { _app.OnPasteRowChild  (); }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowSibling((_: unknown, _any: unknown)   => { _app.OnAddRowSibling();   }); });
  window.addEventListener("DOMContentLoaded", () => { OnAddRowChild((_: unknown, _any: unknown)     => { _app.OnAddRowChild();     }); });
  window.addEventListener("DOMContentLoaded", () => { OnNavigateTo((_: unknown, route: string)      => {  router.push(`/${route}`);}); });
  window.addEventListener("DOMContentLoaded", () => { OnDeleteRow((_: unknown, _any: unknown)       => { _app.OnDeleteRow();       }); });

});

onUnmounted(() => { window.removeEventListener("scroll", handleScroll); });
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
