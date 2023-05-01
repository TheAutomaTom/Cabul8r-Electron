<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";
//import TakeoffView from "./views/TakeoffView.vue";
import type { Project } from "../../ipc-models/Takeoff/Project";

import { onLoadProjectFile, onSaveProjectFile, handleSaveProjectFile } from "#preload";

const _app = useAppState();

function handleScroll() { _app.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  //Scroll Listener...
  window.addEventListener("scroll", handleScroll);

  ///App Menu commands...
  // Load project...
  window.addEventListener("DOMContentLoaded", () => {
    onLoadProjectFile((_: unknown, value: Project) => {
      _app.LoadProjectFile(value);
    });
  });
  // Save project
  window.addEventListener("DOMContentLoaded", async () => {
    onSaveProjectFile((_: unknown, filePath: string) => {
      handleSaveProjectFile(filePath, JSON.stringify(_app.Project));
    });
  });

});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
