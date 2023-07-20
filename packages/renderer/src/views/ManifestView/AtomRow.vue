<script setup lang="ts">
// import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
// import { useAppState } from "/@/states/App.state";
import type { Atom } from "../../../../ipc-models/Atom";
import { Css } from "../../infra/defaultValues";

// const app$ = useAppState();
// const p$ = app$.Prj$;

const props = defineProps({
  atom: { type: Object as PropType<Atom>, default: {} as Atom },
  indentLevel: { type: Number, default: 0 }
});
const atom = ref(props.atom);
// const maxWidth = 30 - props.level;

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
      style="background-color: red;"
      :style="`width: ${props.indentLevel}em;`"
    >
&nbsp;<!-- To be control grip for rearranging order -->
    </div>
    <input
      v-model="atom.description"
      :style="`width:${Css.maxTdWidth - props.indentLevel}em;`"
    />
    <input
      v-model="atom.uuid"
      style="width: 4em; text-align: end;"
    />
    <span>{{ props.indentLevel }}</span>
  </div>

  <!--Quarks -->
  <!--
    <tr
      v-for="q in atom.quarks"
      :key="q.uuid"
      style="padding-top: 0.8em;"
    >
      <quark-row
        :key="q.uuid"
        :quark="q"
      />
    </tr>
  -->
</template>
