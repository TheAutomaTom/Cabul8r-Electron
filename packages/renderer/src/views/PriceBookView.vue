<script setup lang="ts">
import PriceBookRow from "./PriceBookView/PriceBookRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();

</script>
<template>
  <!-- Title -->
  <p>
    PRICE BOOK
    <input
      v-model="app$.Project$.Project.name"
      style="font-size: 1.25em;"
    />
  </p>
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
        class="manifest-row-div"
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
