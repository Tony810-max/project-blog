<script setup>
import { RouterLink } from "vue-router";
import DeleteBlog from "./DeleteBlog.vue";
import { inject } from "vue";

const props = defineProps({
  blogData: Array,
});
const isLoading = defineModel("isLoading");

const blog = inject("blogData");
console.log(blog.value);

const onUpdateBlog = (newBlog) => {
  console.log(newBlog);
  props.blogData.value = newBlog;
  setTimeout(() => {
    isLoading.value = true;
  }, 250);
};
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="font-sans text-center w-24">#</th>
        <th class="font-sans text-center w-24">Id Blog</th>
        <th class="font-sans text-center">Title</th>
        <th class="font-sans text-center">Image</th>
        <th class="font-sans text-center">Edit Blog</th>
        <th class="font-sans text-center">Delete Blog</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!isLoading" v-for="index in 5">
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
        <td>
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </td>
      </tr>
      <tr v-if="isLoading" v-for="(item, index) in blog.list" :key="item.name">
        <td class="font-sans text-center">{{ index + 1 }}</td>
        <td class="font-sans text-center">{{ item?.id }}</td>
        <td class="font-sans text-center">{{ item?.title }}</td>
        <td class="font-sans text-center flex justify-center">
          <img
            :src="
              item?.image !== ''
                ? item?.image
                : 'src/assets/images/imgEmty.webp'
            "
            :alt="item?.title"
            class=""
          />
        </td>
        <td class="font-sans text-center">
          <RouterLink
            :to="{ name: 'update-blog', params: { id: item?.id } }"
            class="font-sans italic hover:opacity-70 hover:underline"
            >Edit blog</RouterLink
          >
        </td>
        <td class="font-sans text-center">
          <DeleteBlog
            :id-blog="item?.id"
            :onDeleteBlog="onUpdateBlog"
            v-model:isLoading="isLoading"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
