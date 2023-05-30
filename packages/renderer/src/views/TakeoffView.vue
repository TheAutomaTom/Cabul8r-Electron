<script setup lang="ts">
import { useAppState } from "../states/AppState";
import type { LineItem as LineItemModel}  from "../../../ipc-models/Takeoff/LineItem";
import LineItems from "./TakeoffView/LineItems.vue";

const _app = useAppState();


const updateLineItems = (lineItems: LineItemModel[]): void => {
  Object.assign(_app.Project.takeoff.lineItems, lineItems);
};
</script>
<template>
  <h1>{{ _app.Project.projectName }}</h1>
  <table>
    <tr class="table-header">
      <th>ITEM</th>
      <th>QTY</th>
      <th>UOM</th>
      <th>COST</th>
      <th></th>
    </tr>

    <line-items
      v-if="_app.Project.takeoff"
      :line-items="_app.Project.takeoff.lineItems"
      @update-model="updateLineItems"
    />
  </table>
</template>
<style>
table {
  width: auto;
  width: 100%;
  height: auto;
  border: 2px solid grey;
}
/* tr:nth-child(even),
tr:nth-child(even) input{
  background-color: #f2f2f2;
} */
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
  max-width: 4em;
}
.t-col-left {
  text-align: start;
  padding-left: 0;
  max-width: 3em;
}
.col-narrow {
  max-width: 2em;
}
input{
  padding:0;
  margin:0;
}
</style>
