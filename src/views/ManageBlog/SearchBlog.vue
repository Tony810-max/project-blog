<script setup>
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
      clearable
      @click:clear="handleClearFilter"
      @keyup.enter="sendValueSearch"
    />
  </div>
</template>
