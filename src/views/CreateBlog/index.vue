<script setup>
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import BlogForm from "@/components/BlogForm/index.vue";
import { onMounted, ref } from "vue";

const router = useRouter();
const disableButton = ref(false);
const isLoading = ref(true);

const handleCreateBlog = async (data) => {
  const blog = data;
  const blogExist = JSON.parse(localStorage.getItem("blogs")) || [];
  const user = JSON.parse(localStorage.getItem("user-current"));

  if (blogExist) {
    toast.success("Blog created successfully");
    disableButton.value = true;
    localStorage.setItem(
      "blogs",
      JSON.stringify([
        ...blogExist,
        {
          ...blog,
          id: Number(blogExist?.length + 1),
          dateCreate: new Date().toISOString(),
          user,
        },
      ])
    );
    setTimeout(() => {
      router.push("/");
    }, 1500);
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
  <div v-if="!isLoading" class="space-y-2">
    <span class="font-sans text-2xl font-bold">Create Blog</span>
    <BlogForm
      @handle-blog="handleCreateBlog"
      nameButton="Create"
      :disableButton="disableButton"
    />
  </div>
</template>
