<script setup lang="ts">
import LineItemRow from "./TakeoffViewNative1/LineItemRow.vue";
import { useAppState } from "../states/AppState";
const _app = useAppState();

</script>
<h1>As Line-Item-Row...</h1>
<template>
  <h1>Table</h1>
  <div>
    <input
      :value="_app.Project.name"
      style="font-size: 1.25em;"
    />

    <line-item-row
      v-for="b in _app.Project.lineItems"
      :key="b.id"
      :li="b"
    />
  </div>

  <hr />

  <p>{{ _app.Project }}</p>
</template>
