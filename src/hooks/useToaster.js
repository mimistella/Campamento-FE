import { toast } from "react-hot-toast";

export const useToaster = () => {
  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);
  const info = (msg) => toast(msg);


  const loading = (msg) => toast.loading(msg);

  const dismiss = (id) => toast.dismiss(id);


  const promise = async (promiseFunc, { loadingMsg, successMsg, errorMsg }) => {
    const id = toast.loading(loadingMsg);
    try {
      const result = await promiseFunc();
      toast.success(successMsg, { id });
      return result;
    } catch (err) {
      toast.error(errorMsg, { id });
      throw err;
    }
  };

  return { success, error, info, loading, dismiss, promise };
};