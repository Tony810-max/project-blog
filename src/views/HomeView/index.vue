<script setup>
import { format } from "date-fns";
import { onBeforeMount, ref } from "vue";
const blogs = ref([]);

const isLoading = ref(false);

onBeforeMount(() => {
  const dataLocalStorage = JSON.parse(localStorage.getItem("blogs"));

  if (dataLocalStorage) {
    blogs.value = dataLocalStorage;
  }
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <v-skeleton-loader
      type="card"
      v-if="!isLoading"
      v-for="index in 8"
    ></v-skeleton-loader>
    <template v-for="(blog, index) in blogs" :key="blog.id">
      <div v-if="index <= 6 && isLoading" class="w-full">
        <img
          :src="
            blog.image !== '' ? blog.image : 'src/assets/images/imgEmty.webp'
          "
          alt="img blog"
          class="rounded-md max-h-40 w-full"
        />
        <span class="w-full block font-sans text-xl font-bold text-center">{{
          blog.title
        }}</span>
        <span
          v-if="blog.date"
          class="w-full block font-sans text-xl font-bold text-center"
          >{{ format(new Date(blog.date), "dd-MM-yyyy") }}</span
        >
        <RouterLink
          :to="{ name: 'detail-blog', params: { id: blog.id } }"
          class="w-full block text-right font-sans text-base font-medium hover:cursor-pointer hover:opacity-70 underline text-primary-color"
          >View Detail</RouterLink
        >
      </div>
    </template>
  </div>
</template>
