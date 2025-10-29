import { defineStore } from "pinia";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref([]);

  const totalTickets = computed(() => tickets.value.length);
  const openTickets = computed(
    () => tickets.value.filter((t) => t.status === "open").length
  );
  const inProgressTickets = computed(
    () => tickets.value.filter((t) => t.status === "in_progress").length
  );
  const closedTickets = computed(
    () => tickets.value.filter((t) => t.status === "closed").length
  );
  const recentTickets = computed(() => tickets.value.slice(0, 4));

  const topEmployees = computed(() => {
    const employeeCounts: { [key: string]: number } = {};
    tickets.value.forEach((ticket) => {
      if (ticket.employee) {
        employeeCounts[ticket.employee] =
          (employeeCounts[ticket.employee] || 0) + 1;
      }
    });
    return Object.entries(employeeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  const topClients = computed(() => {
    const clientCounts: { [key: string]: number } = {};
    tickets.value.forEach((ticket) => {
      if (ticket.company) {
        clientCounts[ticket.company] = (clientCounts[ticket.company] || 0) + 1;
      }
    });
    return Object.entries(clientCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  });

  const loadTickets = () => {
    if (process.client) {
      const savedTickets = localStorage.getItem("ticketapp_tickets");
      if (savedTickets) {
        tickets.value = JSON.parse(savedTickets);
      } else {
        initializeDemoTickets();
      }
    }
  };

  const initializeDemoTickets = () => {
    const demoTickets = [
      {
        id: 1,
        title: "Invalid Invoices",
        status: "open",
        priority: "high",
        company: "Othaim",
        startDate: "2023-11-20",
        createdAt: "2023-11-20",
        employee: "Ahmed Mohamed",
        daysLeft: 0,
      },
      {
        id: 2,
        title: "Implementation",
        status: "in_progress",
        priority: "medium",
        company: "Burger King",
        startDate: "2023-11-18",
        createdAt: "2023-11-18",
        employee: "Ahmed Mohamed",
        daysLeft: 0,
      },
      {
        id: 3,
        title: "Install Program",
        status: "closed",
        priority: "high",
        company: "McDonalds",
        startDate: "2023-11-21",
        createdAt: "2023-11-21",
        employee: "Omar Ali",
        daysLeft: 7,
      },
    ];

    tickets.value = demoTickets;
    saveTickets();
  };

  const saveTickets = () => {
    if (process.client) {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets.value));
    }
  };

  const addTicket = (ticket: any) => {
    const newTicket = {
      ...ticket,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tickets.value.unshift(newTicket);
    saveTickets();
    return newTicket;
  };

  const updateTicket = (id: number, updates: any) => {
    const index = tickets.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tickets.value[index] = {
        ...tickets.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveTickets();
    }
  };

  const deleteTicket = (id: number) => {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    saveTickets();
  };

  return {
    tickets: readonly(tickets),
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    recentTickets,
    topEmployees,
    topClients,
    loadTickets,
    addTicket,
    updateTicket,
    deleteTicket,
  };
});
