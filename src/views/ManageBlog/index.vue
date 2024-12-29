<script setup>
import { reactive, provide, onBeforeMount, onMounted } from "vue";
import TableDataBlog from "./TableDataBlog.vue";
import { ref } from "vue";
import EmptyBlog from "./EmptyBlog.vue";
import SearchBlog from "./SearchBlog.vue";
import { useRouter } from "vue-router";

const isLoading = ref(false);

const blogData = reactive({
  list: [],
});
const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
const user = JSON.parse(localStorage.getItem("user-current"));
const router = useRouter();

const blogFilterAuthor = blogs.filter(
  (blog) => blog.user?.email === user.email
);

blogData.list = blogFilterAuthor;

provide("blogData", blogFilterAuthor);

provide("updateBlogData", (newData) => {
  blogData.list = newData;

  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});

const handleSearchblog = (data) => {
  if (data === "") {
    isLoading.value = false;
    blogData.list = blogFilterAuthor;
    setTimeout(() => {
      isLoading.value = true;
    }, 250);
  }

  const searchBlog = blogFilterAuthor.filter((blog) =>
    blog.title.toLowerCase().includes(data.toLowerCase())
  );

  isLoading.value = false;

  blogData.list = searchBlog;

  setTimeout(() => {
    isLoading.value = true;
  }, 250);
};

onBeforeMount(() => {
  if (!user) {
    router.push("/");
  }
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
});
</script>

<template>
  <div class="space-y-2 px-2">
    <SearchBlog @searchValue="handleSearchblog" />
    <v-skeleton-loader v-if="!isLoading" type="table"></v-skeleton-loader>
    <EmptyBlog v-if="blogData.list.length <= 0 && isLoading" />
    <TableDataBlog
      :blogData="blogData.list"
      v-if="blogData.list.length > 0 && isLoading"
      v-model:isLoading="isLoading"
    />
  </div>
</template>
