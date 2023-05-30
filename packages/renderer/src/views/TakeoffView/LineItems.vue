<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItem as LineItemModel}  from "../../../../ipc-models/Takeoff/LineItem";
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
const emits = defineEmits(["update-model"]);
const _app = useAppState();
const lineItems = ref(props.lineItems);

const handleRightClick = (li: LineItemModel): void => {
  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.setRightClickFocus(li);
  HandleRightClick(li.id);
};

const handleUpdateModel = (update: LineItemModel): void => {
  console.log("LineItems.handleUpdateModel:", update.name);

  for(let li of lineItems.value) {
    if (li.id === update.id) {
      li.name = update.name;
      li.quantity = update.quantity;
      li.uom = update.uom;
    }
    break;
  }
  emits("update-model", lineItems.value);
};

</script>
<template>
  <line-item
    v-for="(li, index ) in lineItems"
    :key="li.id"
    :li="li"
    :indx="indx ? indx + index +1: index"
    @update-model="handleUpdateModel"
    @row-right-clicked="handleRightClick"
  >
  </line-item>
</template>
