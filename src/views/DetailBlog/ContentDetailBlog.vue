<script setup>
import { format } from "date-fns";
import { useRoute } from "vue-router";

const route = useRoute();
const idBlog = Number(route.params.id);

const blog = JSON.parse(localStorage.getItem("blogs"));

const filterBlog = blog.find((blog) => Number(blog.id) === Number(idBlog));
</script>
<template>
  <div class="space-y-4 px-2">
    <span class="font-sans text-xl text-center block font-bold uppercase">{{
      filterBlog?.title
    }}</span>

    <div class="flex flex-col gap-2">
      <span class="font-sans text-base">
        By <strong>{{ filterBlog?.author }}</strong>
      </span>
      <div class="flex flex-col sm:flex-row gap-2 sm:items-center">
        <span v-if="filterBlog.dateCreate" class="font-sans text-xs sm:text-sm"
          >Created
          <strong>
            {{
              format(new Date(filterBlog.dateCreate), "dd MMMM, yyyy")
            }}</strong
          ></span
        >
        <span v-if="filterBlog.dateUpdate" class="font-sans text-xs sm:text-sm"
          ><span class="hidden sm:inline-block">•</span> Updated
          <strong>
            {{
              format(new Date(filterBlog.dateUpdate), "dd MMMM, yyyy")
            }}</strong
          ></span
        >
      </div>
    </div>
    <p v-html="filterBlog?.content"></p>
  </div>
</template>
