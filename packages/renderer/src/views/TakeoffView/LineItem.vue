<script setup lang="ts">
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";
import LineItems from "./LineItems.vue";
const props = defineProps({
  li: {
    type: Object as PropType<LineItemModel>,
    default: {} as LineItemModel
  },
  indx: { type: Number, default: 0 },
  parentId: { type: String, default: "" }

});
const li = ref(props.li);
const emits = defineEmits(["update-model", "row-right-clicked"]);

const handleRightClick = () => {
  console.log("row-right-clicked: ", `${props.li.id}_${props.li.name}`);
  emits("row-right-clicked", li.value);
};

onMounted(() => {
  bgColor.value = props.indx % 2 ? "one" : "other";
});
const bgColor=ref("");

</script>
<template>
  <tr
    :id="`${li.id}_${li.name}`"
    :name="li.name"
    :reference="li.reference"
    :quantity="li.quantity"
    :costs="li.costs"
    :uom="li.uom"
    :class="bgColor"
    @contextmenu="handleRightClick()"
  >
    <td style="width:50%">
      <input
        :value="li.name"
        @input="emits('update-model', { ...li, name: ($event.target as HTMLInputElement).value })"
      >
      <!-- @input="updateModel({...li, name: $event.target })" -->
    </td>
    <!-- <td style="width:50%"><input :value="li.id"></td> -->
    <td>
      <input
        class="t-col-right"
        :value="li.quantity"
        @input="emits('update-model', { ...li, quantity: ($event.target as HTMLInputElement).value })"
      >
    </td>
    <td>
      <input
        :value="li.uom"
        @input="emits('update-model', { ...li, uom: ($event.target as HTMLInputElement).value })"
      >
    </td>
    <td>
      <input
        class="t-col-right"
        :value="`$${li.costs}`"
        @input="emits('update-model', { ...li, costs: ($event.target as HTMLInputElement).value })"
      >
    </td>
    <td></td>
  </tr>
  <p style="padding-left:0.5em">
    <line-items
      v-if="props.li.lineItems"
      :line-items="props.li.lineItems"
      :indx="indx"
    ></line-items>
    <!-- @line-items-row-right-clicked="handleRightClick" -->
  </p>
</template>
<style>
.one, .one input {
  background-color: lightgrey;
}
.other, .other input {
  background-color: white;
}
</style>
