<script setup lang="ts">
import { useAppState } from "../states/AppState";
const _app = useAppState();
</script>
<template>
  <h1>Takeoff</h1>
  <table>
    <tr class="table-header">
      <th>ITEM</th>
      <th class="t-col-right">QTY</th>
      <th>UOM</th>
      <th>COST</th>
      <th></th>
    </tr>
    <tr
      v-for="li in _app.Project.takeoff?.lineItems"
      :key="li.name"
    >
      <td><input :value="li.name"></td>
      <td>
        <input
          class="t-col-right"
          :value="li.quantity"
        >
      </td>
      <td><input :value="li.uom"></td>
      <td>
        <input
          class="t-col-right"
          :value="`$${li.costs}`"
        >
      </td>
      <td></td>
    </tr>
    <tr class="table-header">
      <td><input></td>
      <td><input class="t-col-right"></td>
      <td><input></td>
      <td><input class="t-col-right"></td>
      <td><button>+</button></td>
    </tr>
  </table>
</template>
<style>
table {
  width: auto;
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
