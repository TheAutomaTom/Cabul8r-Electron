<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";

import { onLoadProjectFile, onSaveProjectFile, handleSaveProjectFile } from "#preload";
import type { Project } from "../../ipc-models/Takeoff/Project";

const _app = useAppState();

function handleScroll() { _app.IsScrolled = window.scrollY > 0; }

onMounted( async () => {
  window.addEventListener("DOMContentLoaded", () => {
    onLoadProjectFile((_: unknown, value: Project) => {
      _app.LoadProjectFile(value);
    });
  });

  window.addEventListener("DOMContentLoaded", async () => {
    onSaveProjectFile((_: unknown, filePath: string) => {
      handleSaveProjectFile(filePath, JSON.stringify(_app.Project));
    });
  });

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<template>
  <router-view></router-view>
</template>
