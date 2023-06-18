<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { Cost as CostModel} from "../../../../ipc-models/Manifest/Cost";
import { UnitOfMeasurement} from "../../../../ipc-models/Enums/UnitOfMeasurement";
// import { useAppState } from "/@/states/App.state";
// const app$ = useAppState();
// const p$ = app$.Project$;

const props = defineProps({
  li: { type: Object as PropType<CostModel>, default: {} as CostModel }
  // level: { type: Number, default: 0 }
});
const li = ref(props.li);
// const maxWidth = 20 - props.level;

// const handleRightClick = (li: CostModel): void => {
//   p$.HighlightedRow = li;
//   p$.SetRightClickFocus(li);
//   HandleRightClick(li.id);
// };

</script>
<template>
  <tr
    :id="`${props.li.id}_${props.li.name}`"
    :name="props.li.name"


    class="manifest-row"
  >
    <td> <div style="width: 2em; background-color: dimgray;"></div> </td>
    <td>
      <input
        v-model="li.category"
      />
    </td>
    <td>
      <input
        v-model="li.name"
      />
    </td>
    <td>
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
    <td>
      <input
        v-model="li.amount"
      />
    </td>
  </tr>
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
