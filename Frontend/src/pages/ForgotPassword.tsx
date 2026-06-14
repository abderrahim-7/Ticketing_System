import ForgotPasswordBackground from "../assets/ForgotPasswordBackground.avif";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import Toast from "../components/ui/Toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // Empty field validation
    if (!email.trim()) {
      setMessage("Please enter your email");
      setMessageType("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    try {
      await forgotPassword(email);

      setMessage("Reset email sent successfully");
      setMessageType("success");

      setTimeout(() => {
        navigate("/verify-email");
      }, 1200);
    } catch (error: any) {
      console.log("error while sending email : ", error);

      setMessage(
        error?.response?.data?.message || "Failed to send reset email",
      );
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
        {/* Back button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-5 left-5 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={22} className="text-gray-600" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={handleClick} className="space-y-5">
          {/* Email field */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
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

          {/* Submit button */}
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
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
