<script setup lang="ts">
import { useAppState } from "../states/AppState";
import type { LineItem as LineItemModel } from "../../../ipc-models/Takeoff/LineItem";
import LineItemRow from "./TakeoffViewNative1/LineItemRow.vue";
import { HandleRightClick } from "#preload";

const _app = useAppState();

const handleRightClick = (li: LineItemModel): void => {

console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
_app.setRightClickFocus(li);
HandleRightClick(li.id);

};
</script>
<template>
  <div>
    <input
      :value="_app.Project.name"
      style="font-size: 1.25em;"
    />

    <line-item-row
      v-for="b in _app.Project.lineItems"
      :key="b.id"
      :li="b"
      @row-right-clicked="handleRightClick"
    />
  </div>

  <hr />

  <p>{{ _app.Project }}</p>
</template>
