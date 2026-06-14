import { useState } from "react";
import googleLogo from "../assets/googleLogo.svg";
import AuthBackground from "../assets/AuthBackground.png";
import { Link, useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import { register } from "../api/auth";
import Spinner from "../components/ui/Spinner";

const Register = () => {
  const [role, setRole] = useState<"USER" | "AGENT">("USER");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await register(username, email, password, role);

      console.log("Registration successful:", response.data);

      navigate("/verify-email");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
          <Spinner />
        </div>
      )}

      <div
        className={`w-1/2 h-full overflow-hidden transition ${loading ? "opacity-40" : "opacity-100"}`}
      >
        <img
          src={AuthBackground}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`w-1/2 bg-white flex flex-col justify-center px-16 transition ${loading ? "opacity-40 pointer-events-none" : ""}`}
      >
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Create your account
        </h1>

        <div className="relative w-32 h-10 bg-gray-100 rounded-lg flex items-center p-1 mb-2">
          <div
            className={`
              absolute top-1 left-1 w-1/2 h-8 rounded-md
              bg-gradient-to-r from-blue-500 to-purple-600
              transition-all duration-300 ease-out
              ${role === "AGENT" ? "translate-x-full" : ""}
            `}
          />

          <button
            type="button"
            onClick={() => setRole("USER")}
            className="relative z-10 flex-1 flex justify-center items-center"
          >
            <User
              size={18}
              className={`transition-all duration-300 ${
                role === "USER" ? "text-white scale-110" : "text-gray-500"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setRole("AGENT")}
            className="relative z-10 flex-1 flex justify-center items-center"
          >
            <Briefcase
              size={18}
              className={`transition-all duration-300 ${
                role === "AGENT" ? "text-white scale-110" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Sign up as a{" "}
          <span className="font-semibold text-purple-600 capitalize">
            {role}
          </span>
        </p>

        <form className="flex flex-col gap-2 w-2/3" onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="p-3 rounded-xl border-2 border-purple-400"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 rounded-xl border-2 border-purple-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-3 rounded-xl border-2 border-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-50"
          >
            Sign up
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-3 py-3 rounded-xl border border-purple-400"
          >
            <img src={googleLogo} alt="google" className="h-5" />
            <span className="text-sm">Sign up with Google</span>
          </button>

          <span className="text-sm text-gray-500 mt-2 text-center w-full">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-purple-500 hover:underline">Sign In</span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
