<script setup>
import { setUserCurrent, userCurrent } from "@/action/setStateUser";
import Button from "@/components/Button.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();

const currentPath = computed(() => route.path);

const userCurr = computed(() => userCurrent.user);

const handleLogOut = () => {
  setUserCurrent(null);
  toast.success("Log out successfully");

  setTimeout(() => {
    router.push({ name: "home" });
  }, 1500);
};
</script>

<template>
  <div class="flex justify-between items-center p-4">
    <RouterLink
      :to="{ name: 'home' }"
      class="text-3xl font-sans text-red-500 italic font-bold hover:opacity-70"
      >Blog
    </RouterLink>
    <div class="space-x-2">
      <RouterLink
        :to="{ name: 'home' }"
        :class="{ 'text-primary-color': currentPath === '/' }"
        class="hover:opacity-70"
        >Home</RouterLink
      >
      <RouterLink
        v-if="userCurr"
        :to="{ name: 'manage-blog' }"
        :class="{ 'text-primary-color': currentPath === '/manage-blog' }"
        class="hover:opacity-70"
        >Manage Blog</RouterLink
      >
      <RouterLink
        v-if="userCurr"
        :to="{ name: 'create-blog' }"
        :class="{ 'text-primary-color': currentPath === '/create-blog' }"
        class="hover:opacity-70"
        >Create blog</RouterLink
      >
    </div>
    <Button v-if="userCurr" name="Log Out" @click="handleLogOut" />
    <div v-if="!userCurr" class="space-x-2">
      <Button name-href="login" name="Login" />
      <Button name-href="register" name="Register" />
    </div>
  </div>
</template>
