import { useState } from "react";
import googleLogo from "../assets/googleLogo.svg";
import AuthBackground from "../assets/AuthBackground.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 h-screen bg-gray-500 overflow-hidden">
        <img
          src={AuthBackground}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 bg-white flex flex-col p-10 gap-6">
        <h1
          className="
  text-4xl
  font-extrabold
  mb-6
  bg-gradient-to-r
  from-blue-500
  to-purple-600
  bg-clip-text
  py-1
  text-transparent
  tracking-tight
"
        >
          Sign in to your account
        </h1>{" "}
        <form onSubmit={() => {}}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
    w-2/3
    p-4
    mt-5
    mb-2.5
    rounded-2xl
    border-2 border-purple-400
    text-gray-800
    placeholder-gray-500
    focus:outline-none
    focus:border-purple-600
    focus:ring-2
    focus:ring-purple-300
    transition
    duration-300
    shadow-sm
    hover:shadow-md
  "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="
    w-2/3
    p-4
    my-2.5
    rounded-2xl
    border-2 border-purple-400
    text-gray-800
    placeholder-gray-500
    focus:outline-none
    focus:border-purple-600
    focus:ring-2
    focus:ring-purple-300
    transition
    duration-300
    shadow-sm
    hover:shadow-md
  "
          />

          <button
            type="button"
            className={`flex items-center justify-center gap-3 py-3 rounded-lg
                        bg-blue-400 hover:bg-blue-500
                        w-2/3`}
          >
            <span className={`text-sm font-semibold text-white cursor-pointer`}>
              Sign in
            </span>
          </button>

          <div className="flex items-center gap-3 my-3 w-2/3">
            <div className="h-px bg-neutral-700 flex-1" />
            <span className="text-neutral-500 text-sm">or</span>
            <div className="h-px bg-neutral-700 flex-1" />
          </div>

          <button
            type="button"
            className={`flex items-center justify-center gap-3 py-3 mb-3 rounded-lg
                       border border-purple-400 hover:border-purple-600
                       transition w-2/3`}
          >
            <img src={googleLogo} alt="google" className="h-5" />
            <span className={`text-sm "text-black" cursor-pointer`}>
              Sign in with Google
            </span>
          </button>
          <span className="text-blue-500 ml-20">
            Don't have an account,{" "}
            <Link to="/register">
              <span className="text-purple-400 underline hover:text-purple-500 transition-all duration-300 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
