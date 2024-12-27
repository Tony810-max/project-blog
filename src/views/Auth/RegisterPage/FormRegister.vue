<script setup>
import Button from "@/components/Button.vue";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const isLoading = ref(false);
const isShowPassword = ref(false);
const isShowaConfirmPassword = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const rules = {
  required: (value) => !!value || "Please enter a password",
  min: (v) => v.length >= 8 || "Min 8 characters",
  passwordMatch: () =>
    confirmPassword.value === password.value ||
    "The password confirmation does not match.",
};

const isCheck = computed(() => {
  if (!email.value || !password.value || !confirmPassword.value) {
    return true;
  }
  return password.value !== confirmPassword.value;
});

const router = useRouter();

const handleRegister = () => {
  const user = {
    email: email.value,
    password: password.value,
  };

  const userLocal = JSON.parse(localStorage.getItem("users")) || "";

  const isCheckUser =
    userLocal !== "" && userLocal.find((user) => user.email === email.value);

  if (isCheckUser) return toast.error("Email is already");

  localStorage.setItem("users", JSON.stringify([...userLocal, user]));

  toast.success("Register successfully");

  setTimeout(() => {
    router.push("login");
  }, 1500);
};
</script>
<template>
  <form class="min-w-[25rem] space-y-2">
    <v-text-field
      v-model="email"
      label="Email"
      type="input"
      autocomplete="off"
    />
    <v-text-field
      autocomplete="off"
      :rules="[rules.required, rules.min]"
      v-model="password"
      :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
      label="Password"
      counter
      persistent-clear=""
      :type="isShowPassword ? 'text' : 'password'"
      @click:append="isShowPassword = !isShowPassword"
    />
    <v-text-field
      autocomplete="off"
      v-model="confirmPassword"
      :rules="[rules.passwordMatch]"
      :append-icon="isShowaConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
      label="Confirm Password"
      persistent-clear=""
      :type="isShowaConfirmPassword ? 'text' : 'password'"
      @click:append="isShowaConfirmPassword = !isShowaConfirmPassword"
      @keyup.enter="handleRegister"
    />
    <Button
      :loading="isLoading"
      :disable="isCheck"
      name="Register"
      style="width: 100%"
      @click="handleRegister"
    />
  </form>
</template>
