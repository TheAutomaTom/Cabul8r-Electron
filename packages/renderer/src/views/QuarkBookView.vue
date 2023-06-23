<script setup lang="ts">
import PriceBookRow from "./PriceBookView/PriceBookRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();

</script>
<template>
  <!-- Title -->
  <div>
    <p>QUARK BOOK</p>
    <p><input v-model="app$.Prj$.Project.client" /></p>
    <p><input v-model="app$.Prj$.Project.name" /></p>
  </div>
  <!-- Line Items -->

  <table>
    <div
      v-if="app$.PB$.QuarkBook"
      style="width: 100%;"
    >
      <div
        v-for="li in app$.PB$.QuarkBook"
        :key="li.uuid"
        style="padding-top: 0.25em;"
      >
        <price-book-row
          :key="li.uuid"
          :li="li"
        />
      </div>
    </div>
  </table>
</template>
<style>

</style>
