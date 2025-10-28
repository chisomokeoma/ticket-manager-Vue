<template>
  <section>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">
        WELCOME BACK
      </h1>
      <p class="text-sm text-gray-500 text-center">Login With Xomie's mail</p>
    </div>

    <div>
      <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-800 mb-2">
          Email <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <Mail
            :size="20"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="email"
            type="email"
            placeholder="example@xomie-soft.com"
            class="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
          />
        </div>
        <p v-if="errors.email" class="text-red-500 text-xs mt-1">
          {{ errors.email }}
        </p>
      </div>

      <div class="mb-5">
        <label class="block text-sm font-semibold text-gray-800 mb-2">
          Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <Lock
            :size="20"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••"
            class="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <EyeOff v-if="showPassword" :size="20" />
            <Eye v-else :size="20" />
          </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-xs mt-1">
          {{ errors.password }}
        </p>
      </div>

      <div class="flex justify-between items-center mb-6">
        <label class="flex items-center text-sm text-gray-600 cursor-pointer">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="mr-2 cursor-pointer"
          />
          Keep Me Logged In
        </label>
        <a
          href="#"
          class="text-sm text-red-500 no-underline font-medium hover:text-red-600"
        >
          Forgot Your Password?
        </a>
      </div>

      <button
        @click="handleSubmit"
        :disabled="isLoading"
        class="w-full py-3.5 bg-indigo-900 text-white border-0 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-800 disabled:opacity-50"
      >
        <div v-if="isLoading" class="flex items-center justify-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Logging in...
        </div>
        <span v-else>Submit</span>
      </button>

      <p class="text-center mt-6 text-sm text-gray-600">
        Don't have an account?
        <NuxtLink
          to="/sign-up"
          class="text-purple-600 font-semibold no-underline hover:text-purple-700"
        >
          Sign Up
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useToastNotification } from "~/plugins/toast.client";

// Use auth layout
definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();
const toast = useToastNotification();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const errors = reactive<{
  email?: string;
  password?: string;
}>({});

const validate = () => {
  const newErrors: typeof errors = {};

  if (!email.value) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    newErrors.email = "Invalid email address";
  }

  if (!password.value) {
    newErrors.password = "Password is required";
  } else if (password.value.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const mockDetails = {
    email: "test@mail.com",
    password: "Internal123",
    token: "fake-login-data",
  };

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    email.value === mockDetails.email &&
    password.value === mockDetails.password
  ) {
    authStore.login({ email: email.value });
    toast.success("Successfully logged In");
    await navigateTo("/dashboard");
  } else {
    toast.error("Wrong login details");
  }

  isLoading.value = false;
};

// Set page title
useHead({
  title: "Sign In - Xomie's Ticket Manager",
});
</script>
