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
const handleRightClick = (li: LineItemModel): void => {

  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.setRightClickFocus(li);
  HandleRightClick(li.id);

};

</script>
<template>
  <p
    v-if="props.lineItems.length > 0"
    style="font-size:x-small"
  >
    Count: {{ lineItems.length }}
  </p>
  <line-item
    v-for="(li, i ) in props.lineItems"
    :key="li.id"
    :li="li"
    :bg-color="i % 2 === 0 ? 'grey' : 'white'"
    @row-right-clicked="handleRightClick"
  >
  </line-item>
</template>
