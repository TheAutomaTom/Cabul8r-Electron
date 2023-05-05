<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";
import type { Project } from "../../ipc-models/Takeoff/Project";

import { OnLoadProjectFile, OnSaveProjectFile, HandleSaveProjectFile, OnCopyRow, OnPasteRowSibling } from "#preload";
import router from "./infra/router";

const _app = useAppState();

function handleScroll() { _app.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  //Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  ///App Menu commands...
  // Load project...
  window.addEventListener("DOMContentLoaded", () => { OnLoadProjectFile((_: unknown, value: Project) => {
      _app.LoadProjectFile(value);
      router.push("/takeoff");
    });
  });
  // Save project
  window.addEventListener("DOMContentLoaded", async () => { OnSaveProjectFile((_: unknown, filePath: string) => {
      HandleSaveProjectFile(filePath, JSON.stringify(_app.Project));
    });
  });
  //Context commands
  window.addEventListener("DOMContentLoaded", () => { OnCopyRow((_: unknown, _any: unknown) => {
      _app.OnCopyRow();
    });
  });
  window.addEventListener("DOMContentLoaded", () => { OnPasteRowSibling((_: unknown, _any: unknown) => {
      _app.OnPasteRowSibling();
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
