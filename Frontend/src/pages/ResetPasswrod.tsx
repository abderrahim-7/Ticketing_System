import ForgotPasswordBackground from "../assets/ForgotPasswordBackground.avif";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/ui/Toast";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 4) {
      setMessage("Password must contain at least 4 characters");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      token === null
        ? navigate("/login")
        : await resetPassword(token, newPassword);

      setMessage("Password updated successfully");
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error: any) {
      console.error(error);

      setMessage(error?.response?.data?.message || "Failed to update password");
      setMessageType("error");
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${ForgotPasswordBackground})`,
      }}
    >
      {message && (
        <Toast
          type={messageType}
          message={message}
          onClose={() => setMessage("")}
        />
      )}

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={22} className="text-gray-600" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Reset Password
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your new password and confirm it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New password"
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border-2 border-purple-300
                focus:outline-none
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-200
                transition
              "
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm new password"
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border-2 border-purple-300
                focus:outline-none
                focus:border-purple-500
                focus:ring-2
                focus:ring-purple-200
                transition
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold
              hover:shadow-lg hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
