<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-6"
  >
    <!-- Toast Notification -->
    <div
      v-if="showToast"
      :class="[
        'fixed top-5 right-5 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in',
        toastType === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ toastMessage }}
    </div>

    <!-- Content Area -->
    <div class="max-w-7xl mx-auto">
      <!-- Header with Create Button -->
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
      >
        <div class="flex items-center gap-3">
          <Ticket class="text-purple-600" :size="24" />
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Tickets</h1>
        </div>
        <button
          @click="handleCreate"
          class="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors shadow-md text-sm sm:text-base"
        >
          <Plus :size="16" class="sm:hidden" />
          <Plus :size="20" class="hidden sm:block" />
          <span class="hidden sm:inline">Create A Task</span>
          <span class="sm:hidden">Create Task</span>
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Id
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Company
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Start Date
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Days Left
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-semibold text-blue-600"
                >
                  Issue
                </th>
                <th class="px-6 py-4 text-right">
                  <button
                    @click="ticketsStore.loadTickets()"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ml-auto"
                  >
                    Refresh
                    <svg
                      class="w-4 h-4"
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
                  </button>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="filteredTickets.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <Ticket :size="48" class="mx-auto mb-4 text-gray-300" />
                  <p class="text-lg">No tickets found</p>
                  <button
                    @click="handleCreate"
                    class="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Create your first ticket
                  </button>
                </td>
              </tr>
              <tr
                v-else
                v-for="ticket in filteredTickets"
                :key="ticket.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 text-sm font-medium text-gray-800">
                  {{ ticket.id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  {{ ticket.company || "N/A" }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  {{ ticket.startDate || "N/A" }}
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="handleEdit(ticket)"
                    class="group relative"
                    title="Click to change status"
                  >
                    <span
                      :class="[
                        'inline-block w-6 h-6 rounded-full transition-transform group-hover:scale-110 cursor-pointer',
                        ticket.status === 'open'
                          ? 'bg-green-500'
                          : ticket.status === 'in_progress'
                          ? 'bg-orange-500'
                          : 'bg-red-500',
                      ]"
                    />
                  </button>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  {{ ticket.daysLeft || 0 }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">
                  {{ ticket.title }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="handleEdit(ticket)"
                      class="inline-flex items-center justify-center w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                      title="Edit ticket"
                    >
                      <Edit2 :size="18" />
                    </button>
                    <button
                      @click="handleDeleteClick(ticket.id)"
                      class="inline-flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                      title="Delete ticket"
                    >
                      <Trash2 :size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      @click="showModal = false"
    >
      <div
        class="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ modalMode === "create" ? "Create Ticket" : "Edit Ticket" }}
          </h2>
          <button
            @click="showModal = false"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X :size="24" class="text-gray-600" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Product <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                placeholder="E-Invoice"
                :class="[
                  'w-full px-4 py-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
                  formErrors.title ? 'border-red-500' : 'border-gray-300',
                ]"
              />
              <p v-if="formErrors.title" class="text-red-500 text-sm mt-1">
                {{ formErrors.title }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.status"
                :class="[
                  'w-full px-4 py-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white cursor-pointer',
                  formErrors.status ? 'border-red-500' : 'border-gray-300',
                ]"
              >
                <option value="open">Open (Green)</option>
                <option value="in_progress">In Progress (Orange)</option>
                <option value="closed">Closed (Red)</option>
              </select>
              <p v-if="formErrors.status" class="text-red-500 text-sm mt-1">
                {{ formErrors.status }}
              </p>
              <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span
                  class="inline-block w-3 h-3 rounded-full bg-green-500"
                ></span>
                <span>Open</span>
                <span
                  class="inline-block w-3 h-3 rounded-full bg-orange-500 ml-2"
                ></span>
                <span>In Progress</span>
                <span
                  class="inline-block w-3 h-3 rounded-full bg-red-500 ml-2"
                ></span>
                <span>Closed</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Employee <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.employee"
                type="text"
                placeholder="Ahmed Mahmoud"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="formData.startDate"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
                <Calendar
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  :size="20"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                End Date <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="formData.endDate"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
                <Calendar
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  :size="20"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Task Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.description"
              placeholder="Lorem ipsum dolor sit amet consectetur adipiscing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!"
              rows="12"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-black"
            />
          </div>
        </div>

        <div class="flex gap-4 mt-8">
          <button
            @click="showModal = false"
            class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
          >
            Close
          </button>
          <button
            @click="handleSubmit"
            class="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
          >
            {{ modalMode === "create" ? "Add Task" : "Update Task" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
          Delete Ticket?
        </h3>
        <p class="text-gray-600 mb-6 text-center">
          This action cannot be undone. Are you sure you want to delete this
          ticket?
        </p>
        <div class="flex gap-4">
          <button
            @click="showDeleteConfirm = false"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteConfirm"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { Ticket, Plus, Edit2, Trash2, X, Calendar } from "lucide-vue-next";
import { useTicketsStore, type TicketData } from "~/stores/tickets";
const ticketsStore = useTicketsStore();
const { $toast } = useNuxtApp();

const showModal = ref(false);
const modalMode = ref<"create" | "edit">("create");
const currentTicket = ref<TicketData | null>(null);
const showDeleteConfirm = ref(false);
const deleteTicketId = ref<number | null>(null);
const searchTerm = ref("");

const formData = reactive({
  title: "",
  description: "",
  status: "open" as "open" | "in_progress" | "closed",
  priority: "medium" as "high" | "medium" | "low",
  company: "",
  employee: "",
  startDate: "",
  endDate: "",
});

const formErrors = reactive<{
  title?: string;
  status?: string;
  [key: string]: string | undefined;
}>({});

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

const filteredTickets = computed(() => {
  return ticketsStore.tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      (ticket.company &&
        ticket.company.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
});

const showToastMessage = (
  message: string,
  type: "success" | "error" = "success"
) => {
  if (type === "success") {
    $toast.success(message);
  } else {
    $toast.error(message);
  }
};

const validateForm = (): boolean => {
  const errors: typeof formErrors = {};

  if (!formData.title || formData.title.trim().length === 0) {
    errors.title = "Title is required";
  } else if (formData.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (formData.title.length > 100) {
    errors.title = "Title must not exceed 100 characters";
  }

  if (!formData.status) {
    errors.status = "Status is required";
  } else if (!["open", "in_progress", "closed"].includes(formData.status)) {
    errors.status = "Invalid status value";
  }

  Object.assign(formErrors, errors);
  return Object.keys(errors).length === 0;
};

const handleCreate = () => {
  modalMode.value = "create";
  Object.assign(formData, {
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    company: "",
    employee: "",
    startDate: "",
    endDate: "",
  });
  Object.assign(formErrors, {});
  showModal.value = true;
};

const handleEdit = (ticket: TicketData) => {
  modalMode.value = "edit";
  currentTicket.value = ticket;
  Object.assign(formData, {
    title: ticket.title,
    description: ticket.description || "",
    status: ticket.status,
    priority: ticket.priority || "medium",
    company: ticket.company || "",
    employee: ticket.employee || "",
    startDate: ticket.startDate || "",
    endDate: ticket.endDate || "",
  });
  Object.assign(formErrors, {});
  showModal.value = true;
};

const handleSubmit = () => {
  if (!validateForm()) {
    showToastMessage("Please fix the errors in the form", "error");
    return;
  }

  if (modalMode.value === "create") {
    ticketsStore.addTicket({
      ...formData,
      daysLeft: 0,
    });
    showToastMessage("Ticket created successfully!", "success");
  } else {
    if (!currentTicket.value) return;

    ticketsStore.updateTicket(currentTicket.value.id, {
      ...formData,
    });
    showToastMessage("Ticket updated successfully!", "success");
  }

  showModal.value = false;
  currentTicket.value = null;
};

const handleDeleteClick = (ticketId: number) => {
  deleteTicketId.value = ticketId;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirm = () => {
  if (deleteTicketId.value === null) return;

  ticketsStore.deleteTicket(deleteTicketId.value);
  showToastMessage("Ticket deleted successfully!", "success");
  showDeleteConfirm.value = false;
  deleteTicketId.value = null;
};

onMounted(() => {
  ticketsStore.loadTickets();
});

// Set page title
useHead({
  title: "Tickets - Xomie's Ticket Manager",
});
</script>
