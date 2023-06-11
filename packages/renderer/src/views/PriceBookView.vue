<script setup lang="ts">
import TakeoffRow from "./TakeoffView/TakeoffRow.vue";
import { useAppState } from "../states/App.state";
const app$ = useAppState();
const p$ = app$.Project$;

</script>
<template>
  <!-- Title -->
  <p>
    PRICE BOOK
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
        :key="li.id"
        style="padding-top: 0.25em;"
        class="line-item-row-div"
      >
        <takeoff-row
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
