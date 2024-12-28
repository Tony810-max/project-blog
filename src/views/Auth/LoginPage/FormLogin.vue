<script setup>
import Button from "@/components/Button.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { setUserCurrent } from "@/action/setStateUser";

const isLoading = ref(false);
const show = ref(false);
const email = ref("");
const password = ref("");

const rules = {
  required: (value) => !!value || "Please enter a password",
  min: (v) => v.length >= 8 || "Min 8 characters",
  emailRules: (v) =>
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail must be valid",
  passwordMatch: () =>
    confirmPassword.value === password.value ||
    "The password confirmation does not match.",
};

const router = useRouter();

const isCheck = computed(() => {
  const isEmailValid = rules.emailRules(email.value) === true;
  const isPasswordEntered = !!password.value;
  return !(isEmailValid && isPasswordEntered);
});

const handleLogin = () => {
  isLoading.value = true;

  const emailLogin = email.value.toLowerCase();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length <= 0) {
    isLoading.value = false;
    return toast.error("No user found");
  }

  const findEmail = users.find((user) =>
    user.email.toLowerCase().includes(emailLogin)
  );

  if (!findEmail) {
    isLoading.value = false;
    isCheck.value = false;
    return toast.error("Email is not registered");
  }

  if (findEmail.password !== password.value) {
    isLoading.value = false;
    isCheck.value = false;
    return toast.error("Email or Password is incorrect");
  }

  setUserCurrent(findEmail);

  toast.success("Login successfullly....");

  setTimeout(() => {
    router.push("/");
  }, 1500);
};
</script>
<template>
  <form class="min-w-[25rem]">
    <v-text-field
      :rules="[rules.required, rules.emailRules]"
      v-model="email"
      label="Email"
      type="input"
      autocomplete="off"
    />
    <v-text-field
      v-model="password"
      :rules="[rules.required]"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      label="Password"
      persistent-clear=""
      :type="show ? 'text' : 'password'"
      @click:append="show = !show"
      autocomplete="off"
      @keyup.enter="handleLogin"
    />
    <Button
      :loading="isLoading"
      :disable="isCheck"
      name="Login"
      style="width: 100%"
      @click="handleLogin"
    />
  </form>
</template>
