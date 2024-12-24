<script setup>
import { onBeforeMount, ref } from "vue";
import ContentDetailBlog from "./ContentDetailBlog.vue";

const isLoading = ref(false);

onBeforeMount(() => {
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});
</script>
<template>
  <div>
    <v-skeleton-loader
      v-if="!isLoading"
      type="paragraph"
      v-for="index in 10"
    ></v-skeleton-loader>
  </div>
  <ContentDetailBlog v-if="isLoading" />
</template>
