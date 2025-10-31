<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
      <!-- Login Form Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">WELCOME BACK</h1>
          <p class="text-sm text-gray-500">Login to your account</p>
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
                placeholder="example@mail.com"
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
            <label
              class="flex items-center text-sm text-gray-600 cursor-pointer"
            >
              <input
                v-model="rememberMe"
                type="checkbox"
                class="mr-2 cursor-pointer w-4 h-4 accent-purple-600"
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
            class="w-full py-3.5 bg-indigo-900 text-white border-0 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-800 hover:shadow-lg disabled:opacity-50"
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
      </div>

      <!-- Illustration Side -->
      <div class="hidden md:flex flex-col items-center justify-center">
        <div
          class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6 shadow-xl"
        >
          <div class="bg-indigo-800 rounded-2xl p-8 shadow-2xl">
            <div class="grid grid-cols-3 gap-4 mb-6">
              <!-- Icon Grid -->
              <div
                class="bg-blue-500 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <Mail :size="32" class="text-white" />
              </div>
              <div
                class="bg-yellow-500 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <Lock :size="32" class="text-white" />
              </div>
              <div
                class="bg-blue-600 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                  />
                </svg>
              </div>
              <div
                class="bg-blue-600 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3" y="11" width="18" height="2" rx="1" />
                  <rect x="3" y="6" width="18" height="2" rx="1" />
                  <rect x="3" y="16" width="18" height="2" rx="1" />
                </svg>
              </div>
              <div
                class="bg-blue-400 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div
                class="bg-orange-500 rounded-xl p-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="white"
                    stroke-width="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-indigo-900 rounded-2xl px-8 py-4 shadow-xl">
          <h2 class="text-white text-2xl font-bold text-center">
            Ticketing System
          </h2>
        </div>

        <!-- Decorative Blobs -->
        <div
          class="absolute bottom-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute top-10 right-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";

// Use auth layout
definePageMeta({
  layout: "auth",
});

// Types
interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

interface SessionToken {
  userId: number;
  email: string;
  fullName: string;
  token: string;
  createdAt: string;
  rememberMe: boolean;
}

const authStore = useAuthStore();
const { $toast } = useNuxtApp();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const errors = reactive<{
  email?: string;
  password?: string;
}>({});

const validate = (): boolean => {
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

  try {
    // Get all registered users
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user with matching credentials
    const user = users.find(
      (u: User) =>
        u.email === email.value.toLowerCase().trim() &&
        u.password === password.value
    );

    if (user) {
      // Create session token (as per project requirements)
      const sessionToken: SessionToken = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        rememberMe: rememberMe.value,
      };

      // Store session using the required key name
      localStorage.setItem("ticketapp_session", JSON.stringify(sessionToken));

      // Update auth store
      authStore.login({ email: user.email, name: user.fullName });

      $toast.success("Successfully logged in!");

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await navigateTo("/dashboard");
    } else {
      // Check if user exists but password is wrong
      const userExists = users.some(
        (u: User) => u.email === email.value.toLowerCase().trim()
      );

      if (userExists) {
        $toast.error("Incorrect password. Please try again.");
      } else {
        $toast.error("No account found with this email. Please sign up first.");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    $toast.error("An error occurred during login. Please try again.");
  } finally {
    isLoading.value = false;
  }
};

// Set page title
useHead({
  title: "Sign In - Xomie's Ticket Manager",
});
</script>
