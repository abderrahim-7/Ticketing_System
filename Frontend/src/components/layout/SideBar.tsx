import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  User as UserIcon,
  Settings,
  LogOut,
  TicketPlus,
  Ticket,
  MessageCircle,
  UserPlus,
  Users,
  Activity,
} from "lucide-react";

interface Props {
  role: "user" | "agent" | "admin";
}

const SideBar = ({ role }: Props) => {
  const users = [
    { icon: TicketPlus, label: "Create", path: "/create-ticket" },
    { icon: Ticket, label: "Tickets", path: "/my-tickets" },
    { icon: MessageCircle, label: "Chats", path: "/chat" },
  ];

  const agents = [
    { icon: Ticket, label: "Tickets", path: "/agent/tickets" },
    { icon: MessageCircle, label: "Chats", path: "/chat" },
  ];

  const admins = [
    { icon: UserPlus, label: "Assign", path: "/admin/assign" },
    { icon: Users, label: "Agents", path: "/admin/manage-agents" },
    { icon: Activity, label: "Monitor", path: "/admin/monitor" },
  ];

  const location = useLocation();

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 flex flex-col justify-between bg-gradient-to-b from-blue-600 to-purple-600 p-3 shadow-lg">
      {" "}
      <div className="flex flex-col gap-4">
        <SidebarButton
          Icon={HomeIcon}
          label="Home"
          active={location.pathname === "/"}
          to={"/"}
        />
        {role === "user" &&
          users.map((item, index) => (
            <SidebarButton
              key={index}
              Icon={item.icon}
              label={item.label}
              to={item.path}
              active={location.pathname === item.path}
            />
          ))}
        {role === "agent" &&
          agents.map((item, index) => (
            <SidebarButton
              key={index}
              Icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              to={item.path}
            />
          ))}
        {role === "admin" &&
          admins.map((item, index) => (
            <SidebarButton
              key={index}
              Icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              to={item.path}
            />
          ))}
        <SidebarButton
          Icon={UserIcon}
          label="Profile"
          active={location.pathname === "/profile"}
          to={"/profile"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <SidebarButton
          Icon={Settings}
          label="Settings"
          active={location.pathname === "/settings"}
          to={"/settings"}
        />
        <SidebarButton
          Icon={LogOut}
          label="Logout"
          active={location.pathname === "/login"}
          to={"/login"}
        />
      </div>
    </div>
  );
};

interface ButtonProps {
  Icon: React.ElementType;
  label: string;
  active?: boolean;
  to: string;
}

const SidebarButton = ({ Icon, label, active, to }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className={`
        relative
        group flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        hover:bg-white/20 hover:scale-105 active:scale-95
      `}
    >
      <div
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white rounded-r-full
          transition-all duration-300 ease-out
          ${active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"}
        `}
      />

      <Icon
        className={`
          w-6 h-6 text-white
          transition-all duration-300 ease-out
          ${active ? "scale-110" : "group-hover:scale-110"}
        `}
      />

      <span
        className={`
          text-xs mt-1 text-white
          transition-all duration-300 ease-out
          ${active ? "font-semibold opacity-100" : "opacity-80 group-hover:opacity-100"}
        `}
      >
        {label}
      </span>
    </div>
  );
};

export default SideBar;
