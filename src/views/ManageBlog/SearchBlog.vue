<script setup>
import Button from "@/components/Button.vue";
import { ref } from "vue";

const valueSearch = ref("");
const emit = defineEmits(["searchValue"]);

const sendValueSearch = () => {
  emit("searchValue", valueSearch.value);
};

const handleClearFilter = () => {
  valueSearch.value = "";
  emit("searchValue", valueSearch.value);
};
</script>
<template>
  <div class="flex items-center gap-4">
    <v-text-field
      hide-details="auto"
      label="Enter Title Blog"
      v-model="valueSearch"
      @keyup.enter="sendValueSearch"
    ></v-text-field>
    <Button class="h-full" name="Clear filter" @Click="handleClearFilter" />
  </div>
</template>
