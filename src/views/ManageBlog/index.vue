<script setup>
import { reactive, provide, onBeforeMount } from "vue";
import TableDataBlog from "./TableDataBlog.vue";
import { ref } from "vue";
import EmptyBlog from "./EmptyBlog.vue";
import SearchBlog from "./SearchBlog.vue";

const isLoading = ref(false);

const blogData = reactive({
  list: [],
});
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
blogData.list = blogs;

onBeforeMount(() => {
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});

provide("blogData", blogData);
provide("updateBlogData", (newData) => {
  blogData.list = newData;
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});

const handleSearchblog = (data) => {
  console.log("data", data);
  if (data === "") {
    isLoading.value = false;
    setTimeout(() => {
      isLoading.value = true;
      return (blogData.list = blogs);
    }, 250);
  }

  const searchBlog = blogData.list.filter((blog) =>
    blog.title.toLowerCase().includes(data.toLowerCase())
  );

  isLoading.value = false;

  setTimeout(() => {
    isLoading.value = true;
    blogData.list = searchBlog;
  }, 250);
};
</script>

<template>
  <SearchBlog @searchValue="handleSearchblog" />
  <v-skeleton-loader v-if="!isLoading" type="table"></v-skeleton-loader>
  <EmptyBlog v-if="blogData.list.length < 0 && isLoading" />
  <TableDataBlog
    v-if="blogData.list.length > 0 && isLoading"
    v-model:isLoading="isLoading"
  />
</template>
