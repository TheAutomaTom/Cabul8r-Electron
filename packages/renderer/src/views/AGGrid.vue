<script setup lang="ts">
import { _PathParserOptions } from "vue-router";
import { ref } from "vue";
import { useAppState } from "../states/AppState";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";



const _app = useAppState();

const columnDefs= ref([
    { headerName: "Desc", field: "name", editable: true },
    { headerName: "Ref", field: "reference", editable: true },
    { headerName: "Qty", field: "quantity", editable: true },
    { headerName: "UOM", field: "uom", editable: true },
    { headerName: "Costs", field: "costs", editable: true }
  ]);
const rowData= ref(_app.Project.takeoff.lineItems);

  // const handleRightClick = (e: MouseEvent) => {
  //   console.log(e);
  // };


</script>
<template>
  <h1>{{ _app.Project.projectName }}</h1>
  <ag-grid-vue
    style="width: auto;"
    class="ag-theme-alpine"
    :dom-layout="`autoHeight`"
    :column-defs="columnDefs"
    :row-data="rowData"
  >
  </ag-grid-vue>
</template>
<style>
  /* .my-ag-grid-class{
    width: 100%;
    height: 100%;
  } */
</style>
