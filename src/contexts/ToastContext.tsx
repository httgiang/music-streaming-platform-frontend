import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext<any>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
