import { useToast } from "vue-toastification";

export default defineNuxtPlugin(() => {
  const toast = useToast();

  return {
    provide: {
      toast: {
        success: (message: string) => toast.success(message),
        error: (message: string) => toast.error(message),
        info: (message: string) => toast.info(message),
        warning: (message: string) => toast.warning(message),
      },
    },
  };
});
