<script setup lang="ts">
import { useAppState } from "../states/App.state";
import MoleculeRow from "./ManifestView/MoleculeRow.vue";

const app$ = useAppState();
const p$ = app$.Prj$;
const maxWidth = app$.CssDefaults.maxTdWidth -1;
</script>
<template>
  <!-- Title -->
  <div>
    <h1>MANIFEST</h1>
    <h2><input v-model="p$.Project.client" /> / <input v-model="p$.Project.name" /></h2>
  </div>
  <div class="manifest-table">
    <!--        -->
    <!--Headers -->
    <div class="manifest-molecule">
      <div
        style="background-color: gray;"
        :style="`width: ${1}em;`"
      >
&nbsp;<!-- To be control grip for rearranging order -->
      </div>
      <h4 :style="`width:${maxWidth}em;`">
        DESCRIPTION
      </h4>
      <h4 style="width: 4em; text-align: end;">
        QTY
      </h4>
    </div>
    <!--           -->
    <!-- Molecules -->
    <!-- <div
      v-if="p$.Project.molecules"
    > -->
    <template
      v-for="m in p$.Project.molecules"
      :key="m.uuid"
    >
      <molecule-row
        :molecule="m"
        :indent-level="1"
        class="manifest-molecule"
      />
    </template>
    <!-- </div> -->
  </div>
</template>
<style lang="scss">
.manifest-table {
  width: 100%;
  height:auto;

}
.manifest-molecule {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  // justify-content: space-between;
  align-content: center;
  align-items: baseline;
}
.manifest-desc {
  flex-basis: 15em;
}
// select {
//   appearance: none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   text-overflow: '';
//   border: none;
// }
// input {
//   border: none;
// }
.focussed{
  background-color: #ddff00;
}
</style>
