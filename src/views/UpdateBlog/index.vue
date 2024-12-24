<script setup>
import BlogForm from "@/components/BlogForm/index.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();

const handleUpdateBLog = (data) => {
  const idBlog = route.params.id;
  const blogData = JSON.parse(localStorage.getItem("blogs"));

  const findIndex = blogData.findIndex((blog) => blog.id == idBlog);
  if (findIndex !== -1) {
    blogData[findIndex] = {
      title: data?.title,
      content: data?.content,
      image: data?.image,
      id: Number(idBlog),
    };
    localStorage.setItem("blogs", JSON.stringify(blogData));
    toast.success("BLog updated successfully");
    setTimeout(() => {
      router.push({ name: "manage-blog" });
    }, 250);
  }
};
</script>
<template>
  <BlogForm nameButton="Update Blog" @handle-blog="handleUpdateBLog" />
</template>
