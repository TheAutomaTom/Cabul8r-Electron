<script setup lang="ts">
import { ref } from "vue";
import { useAppState } from "../states/AppState";
import type { LineItem } from "../../../ipc-models/Takeoff/LineItem";
// import LineItem from "./TakeoffView/LineItem.vue";

const _app = useAppState();

const expandedRows = ref([] as LineItem[] | null);

const expandAll = () => {
    expandedRows.value = _app.Project.lineItems.filter((p) => p.id);
};
const collapseAll = () => {
    expandedRows.value = null;
};
</script>

<template>
  <div>
    <input :value="_app.Project.name" />

    <p-data-table
      v-model:expandedRows="expandedRows"
      :value="_app.Project.lineItems"
      data-key="id"
      striped-rows
    >
      <template #header>
        <div class="flex flex-wrap justify-content-end gap-2">
          <p-button
            text
            icon="pi pi-plus"
            label="Expand All"
            @click="expandAll"
          />
          <p-button
            text
            icon="pi pi-minus"
            label="Collapse All"
            @click="collapseAll"
          />
        </div>
      </template>
      <p-column
        field="name"
        header="Name"
      ></p-column>
      <p-column
        field="quantity"
        header="QTY"
      ></p-column>
    </p-data-table>


    <!-- <line-item
      v-for="b in _app.Project.lineItems"
      :key="b.id"
      :li="b"
    /> -->
  </div>

  <hr />

  <p>{{ _app.Project }}</p>
</template>
