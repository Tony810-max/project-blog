<script setup>
import HeaderMain from "@/components/layouts/HeaderMain/index.vue";
import Vertical from "@/components/Vertical.vue";
</script>

<template>
  <Vertical>
    <template #block>
      <div class="container">
        <HeaderMain />
        <RouterView />
      </div>
    </template>
  </Vertical>
</template>
