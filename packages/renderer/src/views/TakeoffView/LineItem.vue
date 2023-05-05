<script setup lang="ts">
import type { PropType } from "vue";
import type { LineItem } from "../../../../ipc-models/Takeoff/LineItem";

const props = defineProps({
  li: {
    type: Object as PropType<LineItem>,
    default: {} as LineItem
  },
  parentId: { type: String, default: "" }

});
const emits = defineEmits(["row-right-clicked"]);
const handleRightClick = () => {
  const toEmit = {
    id: props.parentId ? `${props.parentId}.${props.li.id}` : `${props.li.id}`,
    parent: props.parentId,
    name: props.li.name,
    reference: props.li.reference,
    quantity: props.li.quantity,
    costs: props.li.costs,
    uom: props.li.uom
  };
  emits("row-right-clicked", toEmit);
};

</script>
<template>
  <tr
    :id="props.li.id"
    :parent="props.parentId || props.li.parent"
    :name="props.li.name"
    :reference="props.li.reference"
    :quantity="props.li.quantity"
    :costs="props.li.costs"
    :uom="props.li.uom"
    @contextmenu="handleRightClick()"
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
