<script setup lang="ts">
import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";
import { useAppState } from "../../states/AppState";
const _app = useAppState();

// const emits = defineEmits(["row-right-clicked"]);
const props = defineProps({
  li: { type: Object as PropType<LineItemModel>, default: {} as LineItemModel },
  level: { type: Number, default: 0 }
});
const li = ref(props.li);
const isFocussed = ref(false);
const maxWidth=20 - props.level;

const handleRightClick = (li: LineItemModel): void => {
  isFocussed.value = true;
  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.setRightClickFocus(li);
  HandleRightClick(li.id);
};

</script>
<template>
  <tr
    :id="`${props.li.id}_${props.li.name}`"
    :name="props.li.name"
    :quantity="props.li.quantity"
    :class="isFocussed ? 'focussed' : ''"
    class="line-item-row"
    @contextmenu="handleRightClick(li)"
  >
    <td>
      <input
        v-model="li.name"
        :style="`width:${maxWidth}em;margin-left: ${props.level * 1}em;`"
      />
      <input
        v-model="li.quantity"
        style="width: 3em;"
      />
    </td>
  </tr>
  <table>
    <div v-if="li.lineItems">
      <table-row
        v-for="l in li.lineItems"
        :key="l.id"
        :li="l"
        :level="props.level + 1"
      />
    </div>
  </table>
</template>
<style lang="scss" scoped>
.line-item-row{
  width:100%;
  // background-color: green;
}
.focussed{
  background-color: #ddff00;
}
</style>
