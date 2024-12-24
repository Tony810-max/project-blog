<script setup>
import Button from "@/components/Button.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

const currentPath = computed(() => router.fullPath);
</script>

<template>
  <div class="flex justify-between items-center py-2 px-4">
    <RouterLink
      :to="{ name: 'home' }"
      class="text-3xl font-sans italic font-bold hover:opacity-70"
      >Blog
    </RouterLink>
    <div>
      <RouterLink :to="{ name: 'manage-blog' }" class="hover:opacity-70"
        >Manage Blog</RouterLink
      >
    </div>
    <div>
      <Button
        v-if="currentPath !== '/create-blog'"
        name-href="create-blog"
        name="Create Blog"
      />
      <Button
        v-if="currentPath === '/create-blog'"
        name-href="home"
        name="Go to home"
      />
    </div>
  </div>
</template>
