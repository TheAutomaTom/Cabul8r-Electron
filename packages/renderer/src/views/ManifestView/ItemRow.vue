<script setup lang="ts">
import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { ItemModel} from "../../../../ipc-models/Manifest/ItemModel";
import ItemCostRow from "./ItemCostRow.vue";
import { useAppState } from "/@/states/App.state";
const app$ = useAppState();
const p$ = app$.Project$;

const props = defineProps({
  item: { type: Object as PropType<ItemModel>, default: {} as ItemModel },
  level: { type: Number, default: 0 }
});
const item = ref(props.item);
const maxWidth = 20 - props.level;

const handleRightClick = (item: ItemModel): void => {
  p$.HighlightedRow = item;
  p$.SetRightClickFocus(item);
  HandleRightClick(item.uuid);
};

</script>
<template>
  <tr
    :id="`${props.item.uuid}`"
    :name="props.item.name"
    :quantity="props.item.quantity"
    :class="p$.HighlightedRow == item ? 'focussed' : ''"
    class="manifest-row"
    @contextmenu="handleRightClick(item)"
  >
    <td>
      <div
        style="width: 2em; background-color: dimgray;"
        :style="`margin-left: ${props.level * 1}em;`"
      >
        <!-- To be control grip for rearranging order -->
      </div>
    </td>

    <td>
      <input
        v-model="item.name"
        :style="`width:${maxWidth}em;`"
      />
    </td>

    <td>
      <input
        v-model="item.quantity"
        style="width: 4em; text-align: end;"
      />
    </td>
  </tr>

  <!-- ... -->
  <table v-if="item.cost">
    <item-cost-row
      :ci="item.cost!"
    />
  </table>
</template>
<style lang="scss" scoped>
.manifest-row{
  width:100%;
  border-top: white 1px solid;
  border-bottom: lightgray 1px solid;
}
.focussed{
  background-color: #ddff00;
}
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-overflow: '';
  border: none;
}
input {
  border: none;
}
</style>
