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
  },
  indx: { type: Number, default: 0 }
});
const _app = useAppState();
const handleRightClick = (li: LineItemModel): void => {

  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.setRightClickFocus(li);
  HandleRightClick(li.id);

};

</script>
<template>
  <line-item
    v-for="(li, index ) in props.lineItems"
    :key="li.id"
    :li="li"
    :indx="indx ? indx + index: index"
    @row-right-clicked="handleRightClick"
  >
  </line-item>
</template>
