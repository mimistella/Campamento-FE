import { toast } from "react-hot-toast";

export const useToaster = () => {

    const baseStyle = {
    border: "1px solid #ddd",
    padding: "16px",
    fontWeight: 500,
    fontSize: "0.95rem",
    borderRadius: "10px",
  };

  const success = (msg) =>
    toast.success(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #16a34a",
        color: "#14532d",
        background: "#dcfce7",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#f0fdf4",
      },
    });

  const error = (msg) =>
    toast.error(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #dc2626",
        color: "#7f1d1d",
        background: "#fee2e2",
      },
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fef2f2",
      },
    });

  const info = (msg) =>
    toast(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #2563eb",
        color: "#1e3a8a",
        background: "#dbeafe",
      },
      iconTheme: {
        primary: "#2563eb",
        secondary: "#eff6ff",
      },
    });

  const loading = (msg) =>
    toast.loading(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #facc15",
        color: "#713f12",
        background: "#fef9c3",
      },
      iconTheme: {
        primary: "#facc15",
        secondary: "#fefce8",
      },
    });
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