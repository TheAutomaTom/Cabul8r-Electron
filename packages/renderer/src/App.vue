<script lang="ts" setup>
import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted } from "vue";

// import type {UserData} from "../../ipc-models/UserData";
// const userData = ref<UserData>();

import { onLoadProjectFile } from "#preload";
import type { Project } from "./../../ipc-models/Takeoff/Takeoff";

const _app = useAppState();

function handleScroll() {
  _app.IsScrolled = window.scrollY > 0;
  console.log(window.scrollY);
}

onMounted( async () => {
  window.addEventListener("DOMContentLoaded", () => {
    onLoadProjectFile((_: unknown, value: Project) => { _app.Project = value; });
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
  <p>Project: {{ _app.Project.projectName }}</p>
  <p>Client: {{ _app.Project.projectClient }}</p>
  <p>Line items count: {{ _app.Project.takeoff?.lineItems?.length }}</p>
  <p
    v-for="li in _app.Project.takeoff?.lineItems"
    :key="li.name"
  >
    {{ li.name }} - {{ li.quantity }} - {{ li.uom }}
  </p>
</template>
