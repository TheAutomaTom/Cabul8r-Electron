<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
// import { useAppState } from "/@/states/App.state";
import type { Molecule } from "../../../../ipc-models/Molecule";
import AtomRow from "./AtomRow.vue";

// const app$ = useAppState();
// const p$ = app$.Prj$;

const props = defineProps({
  molecule: { type: Object as PropType<Molecule>, default: {} as Molecule },
  level: { type: Number, default: 0 }
});
const molecule = ref(props.molecule);
const maxWidth = 10 - props.level;

// const handleRightClick = (item: Molecule): void => {
//   p$.HighlightedRow = item;
//   p$.SetRightClickFocus(item);
//   HandleRightClick(item.uuid);
// };

</script>
<template>
  <!-- <tr
    :id="`${props.molecule.uuid}`"
    :description="props.molecule.description"
    :quantity="props.molecule.quantity"
    :class="p$.HighlightedRow == molecule ? 'focussed' : ''"

    style="border-bottom: red 2px solid;"
    @contextmenu="handleRightClick(molecule)"
  > -->
  <tr>
    <td>
      <div
        style="width: 2em; background-color: dimgray;"
        :style="`margin-left: ${props.level * 1}em;`"
      >
        <!-- To be control grip for rearranging order -->8
      </div>
    </td>
    <td>
      <input
        v-model="molecule.description"
        :style="`width:${maxWidth}em;`"
      />
    </td>
    <td>
      <input
        v-model="molecule.quantity"
        style="width: 4em; text-align: end;"
      />
    </td>
  </tr>
  <!-- </tr> -->

  <!--Atoms -->
  <template
    v-for="a in molecule.atoms"
    :key="a.uuid"
  >
    <atom-row
      :atom="a"
      style="padding-top: 0.8em;"
    />
  </template>

  <!--Sub-Molecules -->

  <template
    v-for="m in molecule.molecules"
    :key="m.uuid"
  >
    <molecule-row
      :molecule="m"
      style="padding-top: 0.8em;"
    />
  </template>
</template>
