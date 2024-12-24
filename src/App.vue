<script setup>
import FooterMain from "@/components/layouts/FooterMain.vue";
import HeaderMain from "@/components/layouts/HeaderMain/index.vue";
import Vertical from "@/components/Vertical.vue";
import { ref } from "vue";
// import { useRouter } from "vue-router";

const value = ref(0);
const bufferValue = ref(100);
const isLoading = ref(true);

// const router = useRouter();

// const startProgress = () => {
//   value.value = 0;
//   isLoading.value = true;
//   const timer = new Promise((resolve) => {
//     setInterval(() => {
//       if (value.value < 100) {
//         value.value += 2;
//       } else {
//         clearInterval(timer);
//         resolve();
//       }
//     }, 30);
//   });
//   return timer;
// };

// router.beforeEach(async (to, from, next) => {
//   await startProgress();
//   isLoading.value = false;
//   next();
// });
</script>

<template>
  <Vertical #block>
    <div class="container">
      <!-- Thanh progress -->
      <v-progress-linear
        v-model="value"
        :buffer-value="bufferValue"
        color="primary"
        height="4"
        v-if="isLoading"
      ></v-progress-linear>

      <!-- Layout chính -->
      <HeaderMain />
      <RouterView />
      <!-- <RouterView v-if="!isLoading" /> -->
      <!-- <FooterMain /> -->
    </div>
  </Vertical>
</template>
