<script setup>
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import BlogForm from "@/components/BlogForm/index.vue";
import { ref } from "vue";

const router = useRouter();
const disableButton = ref(false);

const handleCreateBlog = async (data) => {
  const blog = data;
  const blogExist = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogExist) {
    toast.success("Blog created successfully");
    disableButton.value = true;
    localStorage.setItem(
      "blogs",
      JSON.stringify([
        ...blogExist,
        { ...blog, id: Number(blogExist?.length + 1) },
      ])
    );
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }
};
</script>

<template>
  <BlogForm
    @handle-blog="handleCreateBlog"
    nameButton="Create Blog"
    :disableButton="disableButton"
  />
</template>
