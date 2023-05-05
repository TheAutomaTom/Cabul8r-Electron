<script setup lang="ts">
import type { PropType } from "vue";
import type { Takeoff } from "../../../../ipc-models/Takeoff/Takeoff";
import type { LineItem as LineItemModel}  from "../../../../ipc-models/Takeoff/LineItem";
import LineItem from "./LineItem.vue";

const props = defineProps({
  parentId: { type: String, default: "" },
  takeoff: {
    type: Object as PropType<Takeoff>,
    default: {} as Takeoff
  }
});
const emits = defineEmits(["line-items-row-right-clicked"]);
const handleRightClick = (li: LineItemModel): void => {
  const toEmit = {
    id: li.id,
    parent: props.parentId,
    name: li.name,
    reference: li.reference,
    quantity: li.quantity,
    costs: li.costs,
    uom: li.uom
  };
  emits("line-items-row-right-clicked", toEmit );
};
</script>
<template>
  <p>{{ props.takeoff.lineItems?.length }}</p>
  <line-item
    v-for="li in props.takeoff.lineItems"
    :key="li.id"
    :li="li"
    :parent-id="`${parentId}.${props.takeoff.id}`"
    @row-right-clicked="handleRightClick"
  >
  </line-item>
</template>
