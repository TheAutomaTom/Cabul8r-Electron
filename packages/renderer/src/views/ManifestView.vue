<script setup lang="ts">
import ItemRow from "./ManifestView/ItemRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();
const p$ = app$.Project$;

</script>
<template>
  <!-- Title -->
  <div>
    <p>MANIFEST</p>
    <p><input v-model="p$.Project.client" /></p>
    <p><input v-model="p$.Project.name" /></p>
  </div>
  <!-- Line Items -->
  <table>
    <div
      v-if="p$.Project.manifest"
    >
      <div
        v-for="li in p$.Project.manifest"
        :key="li.uuid"
        style="padding-top: 0.8em;"
      >
        <item-row
          :key="li.uuid"
          :item="li"
        />
      </div>
    </div>
  </table>
</template>
<style>
</style>
