<script setup lang="ts">
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import type { LineItem } from "../../../../ipc-models/Takeoff/LineItem";
import LineItems from "./LineItems.vue";
const props = defineProps({
  li: {
    type: Object as PropType<LineItem>,
    default: {} as LineItem
  },
  indx: { type: Number, default: 0 },
  parentId: { type: String, default: "" }

});
const emits = defineEmits(["row-right-clicked"]);
const handleRightClick = () => {
  console.log("row-right-clicked          : ", `${props.li.id}_${props.li.name}`);
  emits("row-right-clicked", props.li);
};
onMounted(() => {
  bgColor.value = props.indx % 2 ? "one" : "other";
});
// const bgColor=props.indx % 2 ? "white" : "lightgrey";
const bgColor=ref("");

</script>
<template>
  <tr
    :id="`${props.li.id}_${props.li.name}`"
    :name="bgColor"
    :reference="props.li.reference"
    :quantity="props.li.quantity"
    :costs="props.li.costs"
    :uom="props.li.uom"
    :class="bgColor"
    @contextmenu="handleRightClick()"
  >
    <td style="width:50%">
      <input
        :value="bgColor"
      >
    </td>
    <!-- <td style="width:50%"><input :value="props.li.id"></td> -->
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
  <p style="padding-left:0.5em">
    <line-items
      v-if="props.li.lineItems"
      :line-items="props.li.lineItems"
      :indx="indx +1"
    ></line-items>
    <!-- @line-items-row-right-clicked="handleRightClick" -->
  </p>
</template>
<style>
.one {
  background-color: lightgrey;
}
.other {
  background-color: white;
}
</style>
