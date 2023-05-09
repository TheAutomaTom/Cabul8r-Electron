<script setup lang="ts">
import type { PropType } from "vue";import type { LineItem as LineItemModel}  from "../../../../ipc-models/Takeoff/LineItem";
import LineItem from "./LineItem.vue";
import { useAppState } from "/@/states/AppState";
import { HandleRightClick } from "#preload";

const props = defineProps({
  parentId: { type: String, default: "" },
  lineItems: {
    type: Object as PropType<LineItemModel[]>,
    default: {} as LineItemModel[]
  }
});
const _app = useAppState();
// const emits = defineEmits(["line-items-row-right-clicked"]);
const handleRightClick = (li: LineItemModel): void => {

  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.setRightClickFocus(li);
  HandleRightClick(li.id);

  // emits("line-items-row-right-clicked", li );
};

</script>
<template>
  <p style="font-size:x-small">Count: {{ lineItems.length }}</p>
  <p style="padding-left:2em">
    <line-item
      v-for="li in props.lineItems"
      :key="li.id"
      :li="li"
      @row-right-clicked="handleRightClick"
    >
    </line-item>
  </p>
</template>
