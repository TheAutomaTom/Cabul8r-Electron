<script setup lang="ts">
import { computed, ref } from "vue";
import type { PropType } from "vue";
import type { LineItemCost as LineItemCostModel} from "../../../../ipc-models/Manifest/LineItemCost";
import type { Cost as CostModel} from "../../../../ipc-models/Manifest/Cost";
import { CostCategory } from "../../../../ipc-models/Enums/CostCategory";

const props = defineProps({
  ci: { type: Object as PropType<LineItemCostModel>, default: {} as LineItemCostModel },
  level: { type: Number, default: 0 }
});
const ci = ref(props.ci);
const maxWidth = 20 - props.level;


const materialCostSum = computed(() => {
        console.log("ci.value.costs...");
        console.dir(ci.value.costs as CostModel[]);
    let toReturn = 0;
    if(ci.value.costs != undefined){
      for(const c of ci.value.costs as CostModel[]){
        console.log("for(const c of...");
        console.dir(c);
        if (c.kind == CostCategory.MAT){
          toReturn += c.amount;
        }
      }
    }
    console.log("materialCostSum... ", toReturn);
    return toReturn;
  }
);

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
      <span>{{ materialCostSum || "?" }}</span>
      <span>Word</span>

      <!-- Testing -->
      <div
        v-for="c in ci.costs"
        :key="c.uuid"
      >
        <p>
          {{ c.name }}, ${{ c.amount }}, {{ c.uuid }}
        </p>
      </div>
      <!--  -->
    </td>
  </tr>
</template>
<style lang="scss" scoped>
.line-item-row{
  width:100%;
  border-top: white 1px solid;
  border-bottom: red 10px solid;
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
