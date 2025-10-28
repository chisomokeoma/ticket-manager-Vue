<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6"
  >
    <style>
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

    <div class="max-w-7xl mx-auto">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Welcome back{{ user ? `, ${user.email.split("@")[0]}` : "" }}! 👋
          </h1>
          <p class="text-gray-600">
            Here's what's happening with your tickets today
          </p>
        </div>
        <button
          @click="refreshTickets"
          class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh Data
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center gap-3 mb-6">
            <Ticket class="text-purple-600" :size="24" />
            <h2 class="text-lg font-bold text-gray-800">Last Tickets</h2>
          </div>

          <div class="space-y-4">
            <div
              v-if="ticketsStore.recentTickets.length === 0"
              class="text-center text-gray-500 py-4"
            >
              No tickets yet
            </div>
            <div
              v-else
              v-for="ticket in ticketsStore.recentTickets"
              :key="ticket.id"
              :class="[
                'border-l-4 pl-4 py-2',
                getStatusBorderColor(ticket.status),
              ]"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                  >
                    <span class="text-purple-600 text-xs font-semibold">
                      {{
                        ticket.employee
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "AM"
                      }}
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      {{ ticket.employee || "Unknown" }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ ticket.title }} in {{ ticket.company }} Company
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-between text-xs text-gray-500 mt-2"
              >
                <span>📅 {{ ticket.startDate || ticket.createdAt }}</span>
                <span
                  :class="[
                    'px-2 py-1 rounded-full',
                    ticket.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : ticket.status === 'in_progress'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700',
                  ]"
                >
                  {{
                    ticket.status === "in_progress"
                      ? "In Progress"
                      : ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)
                  }}
                </span>
              </div>
            </div>
          </div>

          <NuxtLink
            to="/tickets"
            class="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer block text-center"
          >
            Show All Tickets
          </NuxtLink>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center gap-3 mb-6">
            <Users class="text-purple-600" :size="24" />
            <h2 class="text-lg font-bold text-gray-800">
              Most Employee Active
            </h2>
          </div>

          <div class="space-y-4">
            <div
              v-if="ticketsStore.topEmployees.length === 0"
              class="text-center text-gray-500 py-4"
            >
              No employee data
            </div>
            <div
              v-else
              v-for="(emp, idx) in ticketsStore.topEmployees"
              :key="idx"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-purple-600 text-sm font-semibold">
                    {{
                      emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    }}
                  </span>
                </div>
                <p class="text-sm font-semibold text-gray-800">
                  {{ emp.name }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-gray-800">
                  {{ emp.count }}
                </p>
                <p class="text-sm text-green-500 font-semibold">
                  {{ emp.percentage }}%
                </p>
              </div>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Show All
          </button>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center gap-3 mb-6">
            <Building2 class="text-purple-600" :size="24" />
            <h2 class="text-lg font-bold text-gray-800">Most Client Active</h2>
          </div>

          <div class="space-y-4">
            <div
              v-if="ticketsStore.topClients.length === 0"
              class="text-center text-gray-500 py-4"
            >
              No client data
            </div>
            <div
              v-else
              v-for="(client, idx) in ticketsStore.topClients"
              :key="idx"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-10 h-10',
                    client.color,
                    'rounded-lg flex items-center justify-center text-2xl',
                  ]"
                >
                  {{ client.icon }}
                </div>
                <p class="text-sm font-semibold text-gray-800">
                  {{ client.name }}
                </p>
              </div>
              <p class="text-lg font-bold text-gray-800">
                {{ client.count }}
              </p>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Show All
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Tickets</p>
              <h3 class="text-3xl font-bold text-gray-800">
                {{ ticketsStore.totalTickets }}
              </h3>
            </div>
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <Ticket class="text-white" :size="24" />
            </div>
          </div>
          <div class="flex items-center gap-1 text-sm text-green-500">
            <TrendingUp :size="16" />
            <span>All time</span>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-sm text-gray-600 mb-1">Open Tickets</p>
              <h3 class="text-3xl font-bold text-green-500">
                {{ ticketsStore.openTickets }}
              </h3>
            </div>
            <div
              class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center"
            >
              <CheckCircle class="text-white" :size="24" />
            </div>
          </div>
          <p class="text-sm text-gray-500">Needs attention</p>
        </div>

        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-sm text-gray-600 mb-1">In Progress</p>
              <h3 class="text-3xl font-bold text-orange-500">
                {{ ticketsStore.inProgressTickets }}
              </h3>
            </div>
            <div
              class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center"
            >
              <Clock class="text-white" :size="24" />
            </div>
          </div>
          <p class="text-sm text-gray-500">Being worked on</p>
        </div>

        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-500"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-sm text-gray-600 mb-1">Resolved</p>
              <h3 class="text-3xl font-bold text-gray-600">
                {{ ticketsStore.closedTickets }}
              </h3>
            </div>
            <div
              class="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center"
            >
              <XCircle class="text-white" :size="24" />
            </div>
          </div>
          <p class="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4">
          Departmental performance
        </h3>
        <div
          class="h-64 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center"
        >
          <p class="text-gray-500">
            Chart visualization area - Shows distribution of
            {{ ticketsStore.totalTickets }} tickets
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import {
  Ticket,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Users,
  Building2,
} from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useTicketsStore } from "~/stores/tickets";
import { useToastNotification } from "~/plugins/toast.client";

const authStore = useAuthStore();
const ticketsStore = useTicketsStore();
const toast = useToastNotification();

const user = computed(() => authStore.user);

const getStatusBorderColor = (status: string): string => {
  if (status === "open") return "border-green-500";
  if (status === "in_progress") return "border-orange-500";
  return "border-red-500";
};

const refreshTickets = () => {
  ticketsStore.loadTickets();
  toast.success("Tickets refreshed!");
};

onMounted(() => {
  ticketsStore.loadTickets();

  // Set up periodic refresh
  const interval = setInterval(() => {
    ticketsStore.loadTickets();
  }, 5000);

  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});

// Set page title
useHead({
  title: "Dashboard - Xomie's Ticket Manager",
});
</script>
