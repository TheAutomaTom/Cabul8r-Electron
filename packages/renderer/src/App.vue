<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";
// import type {UserData} from "../../ipc-models/UserData";
// const userData = ref<UserData>();

import { onLoadProjectFile, onSaveProjectFile, handleSaveProjectFile } from "#preload";
import type { Project } from "./../../ipc-models/Takeoff/Takeoff";

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






  // ipc notes...unwrap promises here...  // userData.value = (await getUserData());
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

</script>

<template>
  <!-- <router-view></router-view> -->
  <h1>Takeoff</h1>
  <p>
    Client:
    <input v-model="_app.Project.projectClient" />
  </p>
  <p>
    Project:
    <input
      v-model="_app.Project.projectName"
    />
  </p>
  <p>Scope: {{ _app.Project.takeoff?.lineItems?.length }} line item(s)</p>
  <p
    v-for="li in _app.Project.takeoff?.lineItems"
    :key="li.name"
    style="margin-left: 10px;"
  >
    {{ li.name }}: {{ li.quantity }} {{ li.uom }}
  </p>
</template>
