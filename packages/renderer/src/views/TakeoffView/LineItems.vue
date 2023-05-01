<script setup lang="ts">
import type { PropType } from "vue";
import type { Takeoff } from "../../../../ipc-models/Takeoff/Takeoff";
import LineItem from "./LineItem.vue";

const props = defineProps({
  parent: { type: String, default: "" },
  takeoff: {
    type: Object as PropType<Takeoff>,
    default: {} as Takeoff
  }
});
</script>
<template>
  <p>{{ props.takeoff.lineItems?.length }}</p>
  <line-item
    v-for="li in props.takeoff.lineItems"
    :key="li.id"
    :li="li"
    :parent="`${parent}^${props.takeoff.id}`"
  >
  </line-item>
</template>
