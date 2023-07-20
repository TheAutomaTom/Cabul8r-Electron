<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
// import { useAppState } from "/@/states/App.state";
import type { Molecule } from "../../../../ipc-models/Molecule";
import AtomRow from "./AtomRow.vue";
import { Css } from "../../infra/defaultValues";

// const app$ = useAppState();
// const p$ = app$.Prj$;

const props = defineProps({
  molecule: { type: Object as PropType<Molecule>, default: {} as Molecule },
  indentLevel: { type: Number, default: 0 }
});
const molecule = ref(props.molecule);
// const maxWidth = 10;// - props.indentLevel;

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
  <div class="manifest-molecule">
    <div
      style="background-color: blue;"
      :style="`width: ${props.indentLevel}em;`"
    >
      &nbsp;<!-- To be control grip for rearranging order -->
    </div>
    <input
      v-model="molecule.description"
      :style="`width:${Css.maxTdWidth - props.indentLevel}em;`"
    />
    <input
      v-model="molecule.quantity"
      style="width: 4em; text-align: end;"
    />
    <span>{{ props.indentLevel }}</span>
  </div>

  <!--Atoms -->
  <template
    v-for="a in molecule.atoms"
    :key="a.uuid"
  >
    <atom-row
      :atom="a"
      :indent-level="props.indentLevel +1"
    />
  </template>

  <!--Sub-Molecules -->
  <template
    v-for="m in molecule.molecules"
    :key="m.uuid"
  >
    <molecule-row
      :molecule="m"
      :indent-level="props.indentLevel +1"
    />
  </template>
</template>
