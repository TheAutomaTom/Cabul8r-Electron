<script setup lang="ts">
import type { PropType } from "vue";
import type { LineItem } from "../../../../ipc-models/Takeoff/LineItem";
import { handleRightClick } from "#preload";

const props = defineProps({
  li: {
    type: Object as PropType<LineItem>,
    default: {} as LineItem
  },
  parent: { type: String, default: "" }

});
function onRightClick(_: Event) {
  handleRightClick(`${props.parent}^${props.li.id}`);
  // e.preventDefault();
}
</script>
<template>
  <tr
    :id="props.li.id"
    :parent="props.parent || props.li.parent"
    :name="props.li.name"
    :reference="props.li.reference"
    :quantity="props.li.quantity"
    :costs="props.li.costs"
    :uom="props.li.uom"
    @contextmenu="onRightClick($event)"
  >
    <td><input :value="props.li.name"></td>
    <td>
      <input
        class="t-col-right"
        :value="props.li.quantity"
      >
    </td>
    <td><input :value="props.li.uom"></td>
    <td>
      <input
        class="t-col-right"
        :value="`$${props.li.costs}`"
      >
    </td>
    <td></td>
  </tr>
</template>
