<template>
  <section>
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">
        CREATE ACCOUNT
      </h1>
      <p class="text-sm text-gray-500 text-center">
        Sign up with your Xomie's mail
      </p>
    </div>

    <div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-gray-800 mb-2">
          Full Name <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <User
            :size="20"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="fullName"
            type="text"
            placeholder="John Doe"
            class="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
          />
        </div>
        <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">
          {{ errors.fullName }}
        </p>
      </div>

      <div class="mb-4">
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

      <div class="mb-4">
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

      <div class="mb-4">
        <label class="block text-sm font-semibold text-gray-800 mb-2">
          Confirm Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <Lock
            :size="20"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="••••••"
            class="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-lg text-sm outline-none transition-colors focus:border-purple-500 text-black"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <EyeOff v-if="showConfirmPassword" :size="20" />
            <Eye v-else :size="20" />
          </button>
        </div>
        <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <div class="mb-6">
        <label class="flex items-start text-sm text-gray-600 cursor-pointer">
          <input
            v-model="agreeToTerms"
            type="checkbox"
            class="mr-2 mt-1 cursor-pointer"
          />
          <span>
            I agree to the
            <a
              href="#"
              class="text-purple-600 font-semibold no-underline hover:text-purple-700"
            >
              Terms and Conditions
            </a>
            and
            <a
              href="#"
              class="text-purple-600 font-semibold no-underline hover:text-purple-700"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        <p v-if="errors.agreeToTerms" class="text-red-500 text-xs mt-1">
          {{ errors.agreeToTerms }}
        </p>
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
          Creating Account...
        </div>
        <span v-else>Create Account</span>
      </button>

      <p class="text-center mt-6 text-sm text-gray-600">
        Already have an account?
        <NuxtLink
          to="/sign-in"
          class="text-purple-600 font-semibold no-underline hover:text-purple-700"
        >
          Login
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useToastNotification } from "~/plugins/toast.client";

// Use auth layout
definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();
const toast = useToastNotification();

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const agreeToTerms = ref(false);
const isLoading = ref(false);

const errors = reactive<{
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}>({});

const validate = () => {
  const newErrors: typeof errors = {};

  if (!fullName.value.trim()) newErrors.fullName = "Full name is required";

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

  if (confirmPassword.value !== password.value) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (!agreeToTerms.value) {
    newErrors.agreeToTerms = "You must agree to terms and conditions";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const newUser = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    agreeToTerms: agreeToTerms.value,
  };

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (process.client) {
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  authStore.login({ email: email.value, name: fullName.value });
  toast.success("Account created successfully!");
  await navigateTo("/dashboard");

  isLoading.value = false;
};

// Set page title
useHead({
  title: "Sign Up - Xomie's Ticket Manager",
});
</script>
