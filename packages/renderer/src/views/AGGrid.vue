<script setup lang="ts">
import { _PathParserOptions } from "vue-router";
import { ref } from "vue";
import { useAppState } from "../states/AppState";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";



const _app = useAppState();

const columnDefs= ref([
    { headerName: "Desc", field: "name" },
    { headerName: "Ref", field: "reference" },
    { headerName: "Qty", field: "quantity" },
    { headerName: "UOM", field: "uom" },
    { headerName: "Costs", field: "costs" }
  ]);
const rowData= ref(_app.Project.takeoff.lineItems);

  // const handleRightClick = (e: MouseEvent) => {
  //   console.log(e);
  // };


</script>
<template>
  <h1>{{ _app.Project.projectName }}</h1>
  <ag-grid-vue
    style="width: 500px; height: 200px"
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :row-data="rowData"
  >
  </ag-grid-vue>
</template>
<style>
table {
  /* width: auto; */
  width: 100%;
  height: auto;
  border: 2px solid grey;
}
tr:nth-child(even),
tr:nth-child(even) input{
  background-color: #f2f2f2;
}
th, td{
  padding: 4px 8px;
}
th {
  font-size: small;
  text-align: left;
  font-weight: bold;
  background-color: gray;
  color: white;
}
td input {
  width: 100%;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
}
.t-col-right {
  text-align: end;
  padding-right: 0;
  /* max-width: 4em; */
}
.t-col-left {
  text-align: start;
  padding-left: 0;
  /* max-width: 3em; */
}
.col-narrow {
  max-width: 2em;
}
input{
  padding:0;
  margin:0;
}
</style>
