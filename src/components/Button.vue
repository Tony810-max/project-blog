<script setup>
const props = defineProps({
  name: String,
  class: String,
  disable: {
    type: Boolean,
    default: false,
  },
  loading: Boolean,
  nameHref: String,
  type: String,
});
</script>
<template>
  <v-btn
    :disabled="disable"
    :loading="loading"
    :type="[type === 'submit' ? 'submit' : 'button']"
    :to="{ name: nameHref }"
    variant="outlined"
    :class="[
      'font-sans ',
      { class: true },
      !disable ? 'hover:opacity-60' : 'opacity-50 cursor-default',
    ]"
    :style="{ backgroundColor: '#0549ff', color: 'white' }"
    >{{ name }}
  </v-btn>
</template>
