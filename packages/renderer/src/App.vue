<script lang="ts" setup>
import ReactiveCounter from "/@/components/ReactiveCounter.vue";
import ReactiveHash from "/@/components/ReactiveHash.vue";
import ElectronVersions from "/@/components/ElectronVersions.vue";

import { useAppState } from "./states/AppState";
import { onMounted, onUnmounted, ref } from "vue";

import { getUserData } from "#preload";
import type {UserData} from "../../ipc-models/UserData";

const _app = useAppState();
function handleScroll() {
  _app.IsScrolled = window.scrollY > 0;
  console.log(window.scrollY);
}

const userData = ref<UserData>();

onMounted( async () => {
  window.addEventListener("scroll", handleScroll);


  // ipc notes...unwrap promises here...
  userData.value = (await getUserData());

});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});


const APP_VERSION = import.meta.env.VITE_APP_VERSION;
</script>

<template>  
  <p>{{ userData?.user.name.first }} {{ userData?.user.name.last }}</p>
  <img
    alt="Vue logo"
    src="../assets/logo.svg"
    width="150"
  />

  <p>
    <!-- Example how to inject current app version to UI -->
    App version: {{ APP_VERSION }}
  </p>

  <p>
    For a guide and recipes on how to configure / customize this project,<br />
    check out the
    <a
      href="https://github.com/cawa-93/vite-electron-builder"
      target="_blank"
    >
      vite-electron-builder documentation
    </a>
    .
  </p>

  <fieldset>
    <legend>Test Vue Reactivity</legend>
    <reactive-counter />
  </fieldset>

  <fieldset>
    <legend>Test Node.js API</legend>
    <reactive-hash />
  </fieldset>

  <fieldset>
    <legend>Environment</legend>
    <electron-versions />
  </fieldset>

  <p>
    Edit
    <code>packages/renderer/src/App.vue</code> to test hot module replacement.
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 700px;
}

fieldset {
  margin: 2rem;
  padding: 1rem;
}
</style>
