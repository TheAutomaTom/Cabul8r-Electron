<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { Quark} from "../../../../ipc-models/Quark";
import { UnitOfMeasurement} from "../../../../ipc-models/Enums/UnitOfMeasurement";
// import { useAppState } from "/@/states/App.state";
// const app$ = useAppState();
// const p$ = app$.Prj$;

const props = defineProps({
  quark: { type: Object as PropType<Quark>, default: {} as Quark }
  // level: { type: Number, default: 0 }
});
const quark = ref(props.quark);
// const maxWidth = 20 - props.level;

// const handleRightClick = (li: CostModel): void => {
//   p$.HighlightedRow = li;
//   p$.SetRightClickFocus(li);
//   HandleRightClick(li.id);
// };

</script>
<template>
  <tr
    :id="`${props.quark.uuid}_${props.quark.name}`"
    :name="props.quark.name"


    class="manifest-row"
  >
    <td> <div style="width: 2em; background-color: dimgray;"></div> </td>
    <td>
      <input
        v-model="quark.category"
      />
    </td>
    <td>
      <input
        v-model="quark.name"
      />
    </td>
    <td>
      <select
        id="uoms"
        v-model="quark.uom"
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
        v-model="quark.value"
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
