<script setup>
import { inject, ref } from "vue";
import Button from "@/components/Button.vue";

const idBlog = defineProps({
  idBlog: Number,
});

const isLoading = defineModel("isLoading");
const isDialogActive = ref(false);

const updateBlogData = inject("updateBlogData");

const handleDeleteBlog = () => {
  const blogLocalStorage = JSON.parse(localStorage.getItem("blogs"));

  const filterBlog = blogLocalStorage.filter(
    (blog) => blog?.id !== idBlog.idBlog
  );

  if (updateBlogData) {
    updateBlogData(filterBlog);
  }

  localStorage.setItem("blogs", JSON.stringify(filterBlog));
  isLoading.value = false;
  isDialogActive.value = false;
};
</script>

<template>
  <v-dialog v-model="isDialogActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <span
        v-bind="activatorProps"
        class="text-red-color hover:cursor-pointer hover:opacity-70"
        @click="isDialogActive = true"
        >Delete</span
      >
    </template>

    <template v-slot:default>
      <v-card title="Are you sure you want to delete this blog?">
        <v-card-text>
          Once deleted, it cannot be undone. Press
          <span class="underline font-bold italic">delete</span> to remove this
          blog.
        </v-card-text>
        <div class="flex gap-2 justify-end px-4 py-2">
          <Button
            name="Cancel"
            :style="{ backgroundColor: 'white', color: 'black' }"
            @click="isDialogActive = false"
          />
          <Button name="Delete" @click="handleDeleteBlog" />
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>
