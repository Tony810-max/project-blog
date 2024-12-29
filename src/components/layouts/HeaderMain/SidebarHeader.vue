<script setup>
import Button from "@/components/Button.vue";
import ElenmentEnd from "@/components/ElenmentEnd.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const props = defineProps({
  userCurr: Object,
  isLoading: Boolean,
  handleLogOut: Function,
});

const open = ref(false);

watch(
  () => props.isLoading,
  (newVal) => {
    open.value = newVal;
  }
);

const emit = defineEmits(["close"]);
const router = useRouter();
const route = useRoute();

const routeCurrent = computed(() => route.path);

const handleClose = () => {
  open.value = false;
  emit("close", false);
};

watch(open, () => {
  emit("close", open.value);
});

const handleNavigate = (href) => {
  router.push({ name: href });
  console.log("href", href);
};
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="open" temporary>
      <ElenmentEnd>
        <template #element>
          <img
            src="/src/assets/icons/closeIcon.svg"
            alt="close icon"
            class="w-8 h-8 hover:cursor-pointer hover:opacity-50"
            @click="handleClose"
          />
        </template>
      </ElenmentEnd>
      <v-divider></v-divider>

      <v-list density="compact">
        <v-list-item
          :class="{ 'bg-primary': routeCurrent === '/' }"
          prependIcon="mdi-home"
          title="Home"
          @click="handleNavigate('home')"
        >
        </v-list-item>
        <v-list-item
          v-if="userCurr"
          :class="{ 'bg-primary': routeCurrent === '/manage-blog' }"
          prependIcon="mdi-widgets"
          title="Manage Blog"
          @click="handleNavigate('manage-blog')"
        ></v-list-item>
        <v-list-item
          v-if="userCurr"
          :class="{ 'bg-primary': routeCurrent === '/create-blog' }"
          prepend-icon="mdi-forum"
          title="Create Blog"
          @click="handleNavigate('create-blog')"
        ></v-list-item>
      </v-list>
      <ElenmentEnd class="py-4">
        <template #element>
          <Button v-if="userCurr" name="Log Out" @click="handleLogOut" />
          <div v-if="!userCurr" class="space-x-2">
            <Button name-href="login" name="Login" />
            <Button name-href="register" name="Register" />
          </div>
        </template>
      </ElenmentEnd>
    </v-navigation-drawer>
  </v-layout>
</template>

<style>
.bg-primary {
  background-color: var(--primary-color);
}
</style>
