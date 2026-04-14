import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import { user } from "../1data/user";

interface Props {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <TopBar />

      {/* Main area */}
      <div className="flex flex-1">
        <SideBar role={user.role} />

        {/* Page content */}
        <main className="flex-1 ml-20 p-4 bg-gray-50 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default GlobalLayout;
