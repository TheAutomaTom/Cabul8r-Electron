<script setup lang="ts">
import PriceBookRow from "./PriceBookView/PriceBookRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();

</script>
<template>
  <!-- Title -->
  <div>
    <p>PRICE BOOK</p>
    <p><input v-model="app$.Project$.Project.client" /></p>
    <p><input v-model="app$.Project$.Project.name" /></p>
  </div>
  <!-- Line Items -->

  <table>
    <div
      v-if="app$.PriceBook$.PriceBook"
      style="width: 100%;"
    >
      <div
        v-for="li in app$.PriceBook$.PriceBook"
        :key="li.id"
        style="padding-top: 0.25em;"
      >
        <price-book-row
          :key="li.id"
          :li="li"
        />
      </div>
    </div>
  </table>
</template>
<style>
table {
  width: 100%;
}
</style>
