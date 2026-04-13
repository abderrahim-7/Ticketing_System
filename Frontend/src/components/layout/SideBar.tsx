import React from "react";
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
    { icon: TicketPlus, label: "Create" },
    { icon: Ticket, label: "Tickets" },
    { icon: MessageCircle, label: "Chats" },
  ];

  const agents = [
    { icon: Ticket, label: "Tickets" },
    { icon: MessageCircle, label: "Chats" },
  ];

  const admins = [
    { icon: UserPlus, label: "Assign" },
    { icon: Users, label: "Agents" },
    { icon: Activity, label: "Monitor" },
  ];

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 flex flex-col justify-between bg-gradient-to-b from-blue-600 to-purple-600 p-3 shadow-lg">
      {" "}
      <div className="flex flex-col gap-4">
        <SidebarButton Icon={HomeIcon} label="Home" />
        {role === "user" &&
          users.map((item, index) => (
            <SidebarButton key={index} Icon={item.icon} label={item.label} />
          ))}
        {role === "agent" &&
          agents.map((item, index) => (
            <SidebarButton key={index} Icon={item.icon} label={item.label} />
          ))}
        {role === "admin" &&
          admins.map((item, index) => (
            <SidebarButton key={index} Icon={item.icon} label={item.label} />
          ))}
        <SidebarButton Icon={UserIcon} label="Profile" />
      </div>
      <div className="flex flex-col gap-4">
        <SidebarButton Icon={Settings} label="Settings" />
        <SidebarButton Icon={LogOut} label="Logout" />
      </div>
    </div>
  );
};

interface ButtonProps {
  Icon: React.ElementType;
  label: string;
}

const SidebarButton = ({ Icon, label }: ButtonProps) => {
  return (
    <div className="group flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/20">
      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />

      <span className="text-xs text-white mt-1 opacity-80 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
};

export default SideBar;
