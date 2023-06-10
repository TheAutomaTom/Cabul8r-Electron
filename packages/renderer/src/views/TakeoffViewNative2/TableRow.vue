<script setup lang="ts">
import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";
import { UnitOfMeasurement} from "../../../../ipc-models/Takeoff/UnitOfMeasurement";
import { useAppState } from "../../states/AppState";
const _app = useAppState();

const props = defineProps({
  li: { type: Object as PropType<LineItemModel>, default: {} as LineItemModel },
  level: { type: Number, default: 0 },
  indx: { type: Number, default: 0 }
});
const emits = defineEmits(["mark-path-to-parent"]);
const li = ref(props.li);
const maxWidth = 20 - props.level;

const handleRightClick = (li: LineItemModel): void => {
  _app.HighlightedRow = li;
  markPathToParent();
  _app.SetRightClickFocus(li);
  HandleRightClick(li.id);
};

// Marks this and every parent as part of path to cut in order to search from top-down later.
const markPathToParent=()=>{
  li.value.isPathToDelete = true;
  emits("mark-path-to-parent");

  console.warn("mark-path-to-parent... ", li.value.name);
  console.dir(li.value);
};

</script>
<template>
  <tr
    :id="`${props.li.id}_${props.li.name}`"
    :name="props.li.name"
    :quantity="props.li.quantity"
    :class="_app.HighlightedRow == li ? 'focussed' : ''"
    class="line-item-row"
    @contextmenu="handleRightClick(li)"
  >
    <td>
      <div style="width: 2em; background-color: dimgray;"></div>
    </td>
    <td>
      <input
        v-model="li.name"
        :style="`width:${maxWidth}em;margin-left: ${props.level * 1}em;`"
      />
      <input
        v-model="li.quantity"
        style="width: 4em; text-align: end;"
      />
      <select
        id="uoms"
        v-model="li.uom"
      >
        <option
          v-for="key in UnitOfMeasurement"
          :key="key"
        >
          {{ key }}
        </option>
      </select>
    </td>
  </tr>
  <!-- ... -->
  <table>
    <div v-if="li.lineItems">
      <table-row
        v-for="(l, index) in li.lineItems"
        :key="l.id"
        :li="l"
        :level="props.level + 1"
        :indx="index +1"
        @mark-path="markPathToParent()"
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
  // text-indent: 1px;
  text-overflow: '';
  border: none;
}
input {
  border: none;
}
</style>
