<script setup>
import { RouterLink } from "vue-router";
import DeleteBlog from "./DeleteBlog.vue";

const props = defineProps({
  blogData: Array,
});

const isLoading = defineModel("isLoading");

const onUpdateBlog = (newBlog) => {
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
      <tr v-if="isLoading" v-for="(item, index) in blogData" :key="item.name">
        <td class="font-sans text-center">{{ index + 1 }}</td>
        <td class="font-sans text-center">{{ item?.title }}</td>
        <td class="font-sans text-center flex justify-center">
          <img
            :src="
              item?.imageBlog !== ''
                ? item?.imageBlog
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
