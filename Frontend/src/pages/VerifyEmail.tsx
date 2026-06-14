import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/Send email.json";

const VerifyEmail = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-white to-pink-200 text-center px-6">
      {/* ANIMATION */}
      <div className="w-60 md:w-80">
        <Lottie animationData={animationData} loop />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
        Verify your email
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-700 text-base md:text-lg max-w-xl leading-relaxed mb-2">
        We've sent a link to your email address.
        <br />
        Please check your inbox and click the link recieved.
      </p>

      {/* NOTE */}
      <p className="text-sm text-gray-500 italic mb-6">
        Didn’t receive the email? Check your spam folder.
      </p>

      {/* BACK TO LOGIN */}
      <Link to="/login">
        <span className="text-lg font-semibold cursor-pointer bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text hover:opacity-80 transition">
          ← Back to Login
        </span>
      </Link>
    </div>
  );
};

export default VerifyEmail;
