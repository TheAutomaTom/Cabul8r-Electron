<script setup lang="ts">
import { computed, ref } from "vue";
import type { PropType } from "vue";
import type { ItemCostModel } from "../../../../ipc-models/Manifest/ItemCostModel";
import type { Cost as CostModel} from "../../../../ipc-models/Manifest/Cost";
import { CostCategory } from "../../../../ipc-models/Enums/CostCategory";

const props = defineProps({
  ic: { type: Object as PropType<ItemCostModel>, default: {} as ItemCostModel },
  level: { type: Number, default: 0 }
});
const ic = ref(props.ic);
const maxWidth = 20 - props.level;

const materialCostSum = computed(() => {
        console.log("ic.value.costs...");
        console.dir(ic.value.costs as CostModel[]);
    let toReturn = 0;
    if(ic.value.costs != undefined){
      for(const c of ic.value.costs as CostModel[]){
        console.log("for(const c of...");
        console.dir(c);
        if (c.category == CostCategory.MAT){
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
    :id="`${props.ic.uuid}`"
    :name="props.ic.name"
  >
    <td>
      <div
        style="width: 2em; background-color: dimgray;"
        :style="`margin-left: ${props.level * 1}em;`"
      >
        <!-- To be control grip for rearranging order -->
      </div>
    </td>

    <td class="cost-row">
      <span
        style="border-bottom: green 5px solid;"
      >
        <input
          v-model="ic.name"
          :style="`width:${maxWidth}em;`"
        />
        <span>{{ materialCostSum || "MAT?" }}</span>
        <span>{{ materialCostSum || "LAB?" }}</span>
      </span>
      <!-- Costs breakout -->
      <tr
        v-for="c in ic.costs"
        :key="c.uuid"
      >
        <p
          style="border-bottom: purple 5px solid;"
        >
          {{ c.name }}, ${{ c.amount }}, {{ c.uuid }}
        </p>
      </tr>
      <!--  -->
    </td>
  </tr>
</template>
