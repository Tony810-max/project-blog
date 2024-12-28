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
  <div class="grid grid-cols-3 gap-2">
    <v-skeleton-loader
      type="card"
      v-if="!isLoading"
      v-for="index in 8"
    ></v-skeleton-loader>
    <template v-for="(blog, index) in blogs" :key="blog.id">
      <div
        v-if="isLoading"
        class="border px-4 py-2 rounded-xl space-y-4 shadow-xl"
      >
        <img
          :src="
            blog.imageBlog !== ''
              ? blog.imageBlog
              : 'src/assets/images/imgEmty.webp'
          "
          alt="img blog"
          class="max-h-40 w-full rounded-xl border"
        />
        <div class="px-2 space-y-2">
          <span class="w-full block font-sans text-lg font-bold">{{
            blog.title
          }}</span>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-sm text-slate-500"
                >By
                <span class="font-bold capitalize text-sm text-black">{{
                  blog.author
                }}</span></span
              >
            </div>
            <span
              v-if="blog.dateCreate"
              class="block font-sans text-sm font-bold italic text-center"
              >{{ format(new Date(blog.dateCreate), "dd-MM-yyyy") }}</span
            >
          </div>
          <RouterLink
            :to="{ name: 'detail-blog', params: { id: blog.id } }"
            class="w-full block text-right font-sans text-base font-medium hover:cursor-pointer hover:opacity-70 underline text-primary-color"
            >View Detail</RouterLink
          >
        </div>
      </div>
    </template>
  </div>
</template>
