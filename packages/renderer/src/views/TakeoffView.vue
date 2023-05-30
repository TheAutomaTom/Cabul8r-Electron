<script setup lang="ts">
import { useAppState } from "../states/AppState";
import LineItem from "./TakeoffView/LineItem.vue";

const _app = useAppState();

</script>

<template>
  <div>
    <input :value="_app.Project.name" />
    <line-item
      v-for="b in _app.Project.lineItems"
      :key="b.id"
      :li="b"
    />
  </div>

  <hr />

  <p>{{ _app.Project }}</p>
</template>
