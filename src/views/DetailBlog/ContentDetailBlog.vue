<script setup>
import Button from "@/components/Button.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const idBlog = Number(route.params.id);

const blog = JSON.parse(localStorage.getItem("blogs"));

const filterBlog = blog.find((blog) => Number(blog.id) === Number(idBlog));
</script>
<template>
  <div class="space-y-4">
    <div class="flex justify-between">
      <Button name-href="home" name="Go to home" />
      <Button name-href="update-blog" name="update blog" />
    </div>
    <span class="font-sans text-xl text-center block font-bold uppercase">{{
      filterBlog?.title
    }}</span>
    <p v-html="filterBlog?.content"></p>
  </div>
</template>
