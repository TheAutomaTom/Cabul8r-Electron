<script setup lang="ts">
import TableRow from "./TakeoffViewNative2/TableRow.vue";
import { useAppState } from "../states/AppState";
const _app = useAppState();

</script>
<template>
  <h1>As Table-Row...</h1>
  <input
    :value="_app.Project.name"
    style="font-size: 1.25em;"
  />
  <table>
    <div
      v-if="_app.Project.lineItems"
      style="width: 100%;"
    >
      <div
        v-for="li in _app.Project.lineItems"
        :key="li.id"
        style="padding-top: 0.25em;"
      >
        <table-row
          :key="li.id"
          :li="li"
        />
      </div>
    </div>
    <!-- @line-items-row-right-clicked="handleRightClick" -->
    <!-- <tr class="table-header">
      <td><input></td>
      <td><input class="t-col-right"></td>
      <td><input></td>
      <td><input class="t-col-right"></td>
      <td><button>+</button></td>
    </tr> -->
  </table>
</template>
<style>
table {
  width: 100%;
}
/* tr:nth-child(even),
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
} */
</style>
