<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";

const props = defineProps({
  li: {
    type: Object as PropType<LineItemModel>,
    default: {} as LineItemModel
  }

});
const li = ref(props.li);

</script>
<template>
  <p>
    <input
      v-model="li.name"
    />
    <input
      v-model="li.id"
    />
    <line-item
      v-for="i in li.lineItems"
      :key="i.id"
      :li="i"
      style="padding-left: 1em;"
    />
  </p>
</template>
