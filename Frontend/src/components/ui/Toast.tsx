import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const closeToast = () => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, 300); // must match animation duration
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const isSuccess = type === "success";

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        min-w-[320px] max-w-md
        rounded-xl shadow-xl
        flex items-center gap-3
        px-4 py-3
        text-white
        ${isSuccess ? "bg-green-500" : "bg-red-500"}
        ${
          isClosing ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }
        transition-all duration-300 ease-in-out
      `}
      style={{
        animation: isClosing ? undefined : "slideIn 300ms ease-out forwards",
      }}
    >
      {isSuccess ? <CheckCircle size={22} /> : <XCircle size={22} />}

      <span className="flex-1 text-sm font-medium">{message}</span>

      <button
        onClick={closeToast}
        className="hover:bg-white/20 rounded-full p-1 transition"
      >
        <X size={18} />
      </button>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Toast;
