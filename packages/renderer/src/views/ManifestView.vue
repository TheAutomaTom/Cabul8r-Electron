<script setup lang="ts">
import ItemRow from "./ManifestView/ItemRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();
const p$ = app$.Project$;

</script>
<template>
  <!-- Title -->
  <p>
    MANIFEST
    <input
      v-model="p$.Project.name"
      style="font-size: 1.25em;"
    />
  </p>
  <!-- Line Items -->
  <table>
    <div
      v-if="p$.Project.lineItems"
      style="width: 100%;"
    >
      <div
        v-for="li in p$.Project.lineItems"
        :key="li.uuid"
        style="padding-top: 0.25em;"
        class="manifest-row-div"
      >
        <item-row
          :key="li.uuid"
          :item="li"
        />
      </div>
    </div>
  </table>
</template>
<style>
table {
  width: 100%;
}
/* https://stackoverflow.com/questions/9867471/zebra-striping-nested-lists-with-css
  manifest-row-div:nth-child(odd) {background:blue}
  manifest-row-div:nth-child(odd) manifest-row-div:nth-child(even) {background:blue}
  manifest-row-div:nth-child(even) manifest-row-div:nth-child(odd) {background:blue}
*/

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
