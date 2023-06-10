<script setup lang="ts">
import { HandleRightClick } from "#preload";
import { ref } from "vue";
import type { PropType } from "vue";
import type { LineItem as LineItemModel} from "../../../../ipc-models/Takeoff/LineItem";
import { useAppState } from "../../states/AppState";
const _app = useAppState();

// const emits = defineEmits(["row-right-clicked"]);
const props = defineProps({
  li: { type: Object as PropType<LineItemModel>, default: {} as LineItemModel },
  level: { type: Number, default: 20 }
});
const li = ref(props.li);
const isFocussed = ref(false);
const maxWidth = ref(200);
const widthPerLevel = `${maxWidth.value - props.level}`;

const handleRightClick = (li: LineItemModel): void => {
  isFocussed.value = true;
  console.log("line-items-row-right-clicked:", `${li.id}_${li.name}`);
  _app.SetRightClickFocus(li);
  HandleRightClick(li.id);
};

</script>
<template>
  <div
    :id="`${props.li.id}_${props.li.name}`"
    :name="props.li.name"
    :quantity="props.li.quantity"
    :class="isFocussed ? 'focussed' : ''"
    class="line-item-row"
    @contextmenu="handleRightClick(li)"
  >
    <div>
      <span>
        <input
          v-model="li.name"
          :style="`width: ${widthPerLevel}px;`"
        />
        <input
          v-model="li.quantity"
          style="width: 3em;"
        />
      </span>
      <div>
        <line-item-row
          v-for="i in li.lineItems"
          :key="i.id"
          :li="i"
          :level="props.level + 20"
          :style="`padding-left: ${20}px;`"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.line-item-row{
  width:100%;
  // background-color: green;

}
.focussed{
  background-color: #ddff00;
}
</style>
