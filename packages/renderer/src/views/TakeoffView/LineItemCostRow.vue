<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItemCost as LineItemCostModel} from "../../../../ipc-models/Takeoff/LineItemCost";
// import { useAppState } from "/@/states/App.state";
// const app$ = useAppState();
// const p$ = app$.Project$;

const props = defineProps({
  ci: { type: Object as PropType<LineItemCostModel>, default: {} as LineItemCostModel },
  level: { type: Number, default: 0 }
});
const ci = ref(props.ci);
const maxWidth = 20 - props.level;

// const handleRightClick = (li: CostModel): void => {
//   p$.HighlightedRow = li;
//   p$.SetRightClickFocus(li);
//   HandleRightClick(li.uuid);
// };

</script>
<template>
  <tr
    :id="`${props.ci.uuid}`"
    :name="props.ci.name"
    class="line-item-row"
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
        v-model="ci.name"
        :style="`width:${maxWidth}em;`"
      />
    </td>
  </tr>
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
