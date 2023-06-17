<script setup lang="ts">
import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";
import { useAppState } from "/@/states/App.state";
const app$ = useAppState();
const p$ = app$.Project$;

const props = defineProps({
  li: { type: Object as PropType<LineItemModel>, default: {} as LineItemModel },
  level: { type: Number, default: 0 }
});
const li = ref(props.li);
const maxWidth = 20 - props.level;

const handleRightClick = (li: LineItemModel): void => {
  p$.HighlightedRow = li;
  p$.SetRightClickFocus(li);
  HandleRightClick(li.uuid);
};

</script>
<template>
  <tr
    :id="`${props.li.uuid}`"
    :name="props.li.name"
    :quantity="props.li.quantity"
    :class="p$.HighlightedRow == li ? 'focussed' : ''"
    class="line-item-row"
    @contextmenu="handleRightClick(li)"
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
        v-model="li.name"
        :style="`width:${maxWidth}em;`"
      />
    </td>
    <td>
      <input
        v-model="li.quantity"
        style="width: 4em; text-align: end;"
      />
    </td>


    <!-- <td>
      <select
        id="expense"
        v-model="li.expense"
      >
        <option
          v-for="key in UnitOfMeasurement"
          :key="key"
        >
          {{ key }}
        </option>
      </select>
    </td> -->
  </tr>
  <!-- ... -->
  <table>
    <div v-if="li.lineItems">
      <takeoff-row
        v-for="l in li.lineItems"
        :key="l.uuid"
        :li="l"
        :level="props.level + 1"
      />
    </div>
  </table>
</template>
<style lang="scss" scoped>
.line-item-row{
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
