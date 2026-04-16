import { Link } from "react-router-dom";
import { User as ProfileIcon } from "lucide-react";

const TopBar = () => {
  return (
    <header className="sticky z-1 top-0 w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center px-6">
      <div className="flex-1 flex justify-center">
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Ticketing System
        </h1>
      </div>

      <Link to="/profile">
        <button className="p-2 cursor-pointer rounded-full border-2 border-white text-white hover:bg-white hover:text-purple-600 transition">
          <ProfileIcon size={22} />
        </button>
      </Link>
    </header>
  );
};

export default TopBar;
