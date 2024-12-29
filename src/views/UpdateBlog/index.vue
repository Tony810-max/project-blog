<script setup>
import BlogForm from "@/components/BlogForm/index.vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const isLoading = ref(true);

const handleUpdateBLog = (data) => {
  const idBlog = route.params.id;
  const blogData = JSON.parse(localStorage.getItem("blogs"));

  const findIndex = blogData.findIndex((blog) => blog.id == idBlog);

  if (findIndex !== -1) {
    blogData[findIndex] = {
      ...blogData[findIndex],
      title: data.title,
      content: data.content,
      image: data.image,
      imageBlog: data.imageBlog,
      author: data.author,
      dateUpdate: new Date().toISOString(),
    };
    localStorage.setItem("blogs", JSON.stringify(blogData));
    toast.success("BLog updated successfully");
    setTimeout(() => {
      router.push({ name: "manage-blog" });
    }, 1000);
  }
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 250);
});
</script>
<template>
  <div>
    <v-skeleton-loader
      v-if="isLoading"
      v-for="index in 10"
      type="text"
    ></v-skeleton-loader>
  </div>
  <div v-if="!isLoading" class="space-y-2 px-2">
    <span class="font-sans text-2xl font-bold">Create Blog</span>
    <BlogForm nameButton="Update Blog" @handle-blog="handleUpdateBLog" />
  </div>
</template>
