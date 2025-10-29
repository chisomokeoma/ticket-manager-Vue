<template>
  <div
    class="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 flex h-full"
  >
    <aside
      :class="[
        sidebarOpen ? 'w-64 sm:w-72' : 'w-0',
        'bg-white shadow-xl transition-all duration-300 fixed left-0 top-0 h-full overflow-hidden z-40',
      ]"
    >
      <div class="p-6">
        <div class="flex items-center gap-3 mb-10">
          <div
            class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <span class="text-white text-sm font-bold">XM</span>
          </div>
          <div>
            <h2 class="text-lg font-bold text-gray-800">XOMIE'S MANAGER</h2>
            <p class="text-xs text-gray-500">TICKET SOLUTIONS</p>
          </div>
        </div>

        <div class="flex flex-col flex-1 h-full">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.link"
            class="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg mb-2 font-medium"
          >
            <component :is="link.icon" />
            <span class="cursor-pointer">{{ link.name }}</span>
          </NuxtLink>

          <button
            @click="handleLogout"
            class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>

    <main
      :class="[
        sidebarOpen ? 'ml-64 sm:ml-72' : 'ml-0',
        'flex-1 transition-all duration-300',
      ]"
    >
      <header
        class="bg-white shadow-sm px-6 py-4 flex items-center justify-between"
      >
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X v-if="sidebarOpen" :size="24" />
          <Menu v-else :size="24" />
        </button>

        <div class="flex-1 max-w-md mx-2 sm:mx-6">
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            />
            <svg
              class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <User :size="16" class="text-gray-500 sm:hidden" />
            <User :size="20" class="text-gray-500 hidden sm:block" />
          </div>
          <span
            class="font-semibold text-gray-800 text-sm sm:text-base hidden sm:block"
            >Admin</span
          >
        </div>
      </header>

      <div class="p-4 sm:p-6 flex items-center">
        <slot />
      </div>
    </main>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BarChart3, Ticket, Menu, X } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const { $toast } = useNuxtApp();

const sidebarOpen = ref(true);
const searchTerm = ref("");

const navLinks = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Tickets",
    link: "/tickets",
    icon: Ticket,
  },
];

const handleLogout = async () => {
  authStore.logout();
  $toast.success("Logged out successfully");
  await navigateTo("/sign-in");
};

// Check authentication on mount
onMounted(() => {
  authStore.checkAuth();
  if (!authStore.isAuthenticated) {
    navigateTo("/sign-in");
  }
});
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
