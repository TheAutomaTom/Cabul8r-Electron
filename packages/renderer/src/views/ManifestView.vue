<script setup lang="ts">
import { useAppState } from "../states/App.state";
import MoleculeRow from "./ManifestView/MoleculeRow.vue";

const app$ = useAppState();
const p$ = app$.Prj$;
const maxWidth = app$.CssDefaults.maxTdWidth;
</script>
<template>
  <!-- Title -->
  <div>
    <p>MANIFEST</p>
    <p><input v-model="p$.Project.client" /></p>
    <p><input v-model="p$.Project.name" /></p>
  </div>
  <table>
    <!--Headers -->
    <tr>
      <td>
        <div
          style="width: 2em; background-color: dimgray;"
          :style="`margin-left: ${0}em;`"
        >
          <!-- To be control grip for rearranging order -->8
        </div>
      </td>
      <td>
        <h5 :style="`width:${maxWidth}em;`">
          Description
        </h5>
      </td>
      <td>
        <h5 style="width: 4em; text-align: end;">
          QTY
        </h5>
      </td>
    </tr>
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
        style="padding-top: 0.8em;"
      />
    </template>
    <!-- </div> -->
  </table>
</template>
