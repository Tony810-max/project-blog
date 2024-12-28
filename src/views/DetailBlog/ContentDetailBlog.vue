<script setup>
import { format } from "date-fns";
import { useRoute } from "vue-router";

const route = useRoute();
const idBlog = Number(route.params.id);

const blog = JSON.parse(localStorage.getItem("blogs"));

const filterBlog = blog.find((blog) => Number(blog.id) === Number(idBlog));
</script>
<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <span v-if="filterBlog.dateCreate"
        >Date created
        <strong>
          {{ format(new Date(filterBlog.dateCreate), "dd-MM-yyyy") }}</strong
        ></span
      >
      <span class="font-sans text-xl block font-bold uppercase">{{
        filterBlog?.title
      }}</span>
      <span v-if="filterBlog.dateUpdate"
        >Last updated
        <strong>
          {{ format(new Date(filterBlog.dateUpdate), "dd-MM-yyyy") }}</strong
        ></span
      >
    </div>
    <p v-html="filterBlog?.content"></p>
  </div>
</template>
