<script setup>
import ElenmentEnd from "@/components/ElenmentEnd.vue";
import Vertical from "@/components/Vertical.vue";
import FormRegister from "./FormRegister.vue";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onBeforeMount(() => {
  const userCurrent = JSON.parse(localStorage.getItem("user-current"));
  if (userCurrent) {
    return router.push("/");
  }
});
</script>
<template>
  <Vertical class="items-center min-h-[calc(100vh-56px)]">
    <template #block>
      <div
        class="px-10 py-4 flex flex-col gap-6 border-2 border-slate-500 rounded-md shadow-lg"
      >
        <span class="text-center font-sans text-3xl font-bold"
          >Create your accout</span
        >
        <FormRegister />
        <ElenmentEnd>
          <template #element>
            <span class="font-sans text-sm"
              >Have an account?
              <RouterLink
                :to="{ name: 'login' }"
                class="font-sans underline font-bold text-primary-color hover:opacity-70"
                >Login now</RouterLink
              >
            </span>
          </template>
        </ElenmentEnd>
      </div>
    </template>
  </Vertical>
</template>
