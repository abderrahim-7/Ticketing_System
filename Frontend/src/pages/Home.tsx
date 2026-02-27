import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <header className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center px-6">
        <div className="flex-1 flex justify-center">
          <h1 className="text-white text-2xl font-bold tracking-wide">
            Ticketing System
          </h1>
        </div>

        <div className="flex gap-3">
          <Link to="/login">
            <button className="px-4 py-1.5 rounded-md border border-white text-white font-medium hover:bg-white hover:text-purple-600 transition">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-1.5 rounded-md bg-white text-purple-600 font-medium hover:bg-opacity-90 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </header>{" "}
    </div>
  );
};

export default Home;
