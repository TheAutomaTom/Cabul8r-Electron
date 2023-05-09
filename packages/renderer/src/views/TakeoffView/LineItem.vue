<script setup lang="ts">
import type { PropType } from "vue";
import type { LineItem } from "../../../../ipc-models/Takeoff/LineItem";
import LineItems from "./LineItems.vue";
const props = defineProps({
  li: {
    type: Object as PropType<LineItem>,
    default: {} as LineItem
  },
  parentId: { type: String, default: "" }

});
const emits = defineEmits(["row-right-clicked"]);
const handleRightClick = () => {
  console.log("row-right-clicked          : ", `${props.li.id}_${props.li.name}`);
  emits("row-right-clicked", props.li);
};

</script>
<template>
  <tr
    :id="`${props.li.id}_${props.li.name}`"
    :name="props.li.name"
    :reference="props.li.reference"
    :quantity="props.li.quantity"
    :costs="props.li.costs"
    :uom="props.li.uom"
    @contextmenu="handleRightClick()"
  >
    <td style="width:50%"><input :value="props.li.name"></td>
    <td style="width:50%"><input :value="props.li.id"></td>
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
  <p style="padding-left:2em">
    <line-items
      v-if="props.li.lineItems"
      :line-items="props.li.lineItems"
    ></line-items>
    <!-- @line-items-row-right-clicked="handleRightClick" -->
  </p>
</template>
