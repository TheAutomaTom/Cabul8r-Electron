<script setup lang="ts">
import { _PathParserOptions } from "vue-router";
import { useAppState } from "../states/AppState";

import { HotTable } from "@handsontable/vue3";
// import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { ref } from "vue";



const _app = useAppState();

const rowData= ref(_app.Project.takeoff.lineItems);



  // const handleRightClick = (e: MouseEvent) => {
  //   console.log(e);
  // };


</script>
<template>
  <hot-table
    :data="rowData"
    :row-headers="true"
    :col-headers="true"
    :hidden-columns="[0]"
    :max-rows="rowData.length+1"
  ></hot-table>
</template>
<style>
</style>
