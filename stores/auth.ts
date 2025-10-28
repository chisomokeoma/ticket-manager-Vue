import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  const login = (userData: any) => {
    user.value = userData;
    isAuthenticated.value = true;
    if (process.client) {
      localStorage.setItem("ticketapp_session", JSON.stringify(userData));
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    if (process.client) {
      localStorage.removeItem("ticketapp_session");
    }
  };

  const checkAuth = () => {
    if (process.client) {
      const session = localStorage.getItem("ticketapp_session");
      if (session) {
        user.value = JSON.parse(session);
        isAuthenticated.value = true;
      }
    }
  };

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    login,
    logout,
    checkAuth,
  };
});
