import store from "@/store";
import Toast from "@/models/Toast.interface";

export default async (callback: () => Promise<void>, successMessage: string) => {
  const toastConfig = {} as Toast;

  try {
    await callback();
    toastConfig.error = false;
    toastConfig.message = successMessage;
  } catch (error: any) {
    toastConfig.error = true;
    toastConfig.message = error.message;
  } finally {
    store.commit("setToastConfig", toastConfig);
    store.commit("setShowToast", true);
  }
};
