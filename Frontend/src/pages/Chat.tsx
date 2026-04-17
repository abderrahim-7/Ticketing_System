import React, { useEffect, useState } from "react";
import GlobalLayout from "../layout/GlobalLayout";
import ProfileImage from "../assets/profileImage.png";
import { user } from "../1data/user";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatData {
  id: number;
  name: string;
  role: "user" | "agent";
  ticket: string;
  lastMessage: string;
  time: string;
}

const Chat = () => {
  const navigate = useNavigate();

  const chats: ChatData[] = [
    {
      id: 1,
      name: "Agent 007",
      role: "agent",
      ticket: "Electrical Outage",
      lastMessage: "We are currently investigating the issue.",
      time: "2 min ago",
    },
    {
      id: 2,
      name: "Agent 009",
      role: "agent",
      ticket: "Software Installation",
      lastMessage: "Can you confirm your OS version?",
      time: "10 min ago",
    },
    {
      id: 3,
      name: "Agent 002",
      role: "agent",
      ticket: "Network Issue",
      lastMessage: "Try restarting your router first.",
      time: "1h ago",
    },
    {
      id: 4,
      name: "Agent 015",
      role: "agent",
      ticket: "Account Problem",
      lastMessage: "Your password reset request is processed.",
      time: "3h ago",
    },
    {
      id: 5,
      name: "Agent 021",
      role: "agent",
      ticket: "Billing & Payment",
      lastMessage: "We need more details about the transaction.",
      time: "Yesterday",
    },
    {
      id: 6,
      name: "Agent 011",
      role: "agent",
      ticket: "Performance Issue",
      lastMessage: "We're optimizing the system, should be fixed soon.",
      time: "Yesterday",
    },
    {
      id: 7,
      name: "Agent 004",
      role: "agent",
      ticket: "Security Concern",
      lastMessage: "Please do not share your credentials.",
      time: "2 days ago",
    },
    {
      id: 8,
      name: "Agent 018",
      role: "agent",
      ticket: "Feature Request",
      lastMessage: "Interesting idea, we'll forward it to the team.",
      time: "2 days ago",
    },
    {
      id: 9,
      name: "Agent 025",
      role: "agent",
      ticket: "Access Issue",
      lastMessage: "Access has now been granted.",
      time: "3 days ago",
    },
    {
      id: 10,
      name: "Agent 030",
      role: "agent",
      ticket: "General Inquiry",
      lastMessage: "Let me clarify that for you.",
      time: "4 days ago",
    },
    {
      id: 11,
      name: "Agent 014",
      role: "agent",
      ticket: "Technical Issue",
      lastMessage: "We found the root cause.",
      time: "5 days ago",
    },
    {
      id: 12,
      name: "Agent 019",
      role: "agent",
      ticket: "Bug Report",
      lastMessage: "Bug confirmed, patch coming soon.",
      time: "1 week ago",
    },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <GlobalLayout>
      <div
        className={`
          flex flex-col items-start px-10 gap-6
          transition-all duration-500 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Chats
        </h1>

        {/* GRID */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className={`
                bg-white rounded-2xl shadow-md p-5 cursor-pointer
                flex flex-col justify-between
                h-48
                transform transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                {/* USER */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                      src={ProfileImage}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {chat.name}
                    </span>

                    <span
                      className={`
                        text-xs font-medium
                        ${
                          chat.role === "agent"
                            ? "text-blue-600"
                            : "text-green-600"
                        }
                      `}
                    >
                      {chat.role}
                    </span>
                  </div>
                </div>

                {/* TIME */}
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>

              {/* TICKET */}
              <div className="mt-3">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                  {chat.ticket}
                </span>
              </div>

              {/* LAST MESSAGE */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500 line-clamp-2">
                  {chat.lastMessage}
                </p>

                <MessageCircle
                  size={18}
                  className="text-purple-500 ml-2 shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Chat;
