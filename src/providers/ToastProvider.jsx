import { Toaster } from "react-hot-toast";

export  function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #f59e0b", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          fontWeight: 500,
          borderRadius: "10px",
        },
        success: {
          iconTheme: { primary: "#f59e0b", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#fd5000ff", secondary: "#fff" },
        },
      }}
    />
  );
}