<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import type { Quark } from "../../../../ipc-models/Quark";

const props = defineProps({
  quark: { type: Object as PropType<Quark>, default: {} as Quark },
  level: { type: Number, default: 0 }
});
const quark = ref(props.quark);
const maxWidth = 10 - props.level;

</script>
<template>
  <tr
    :id="`${props.quark.uuid}`"
    :name="props.quark.name"
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
          v-model="quark.name"
          :style="`width:${maxWidth}em;`"
        />
        <!--
          <span>{{ materialCostSum || "MAT?" }}</span>
          <span>{{ materialCostSum || "LAB?" }}</span>
        -->
      </span>
    </td>
  </tr>
</template>
