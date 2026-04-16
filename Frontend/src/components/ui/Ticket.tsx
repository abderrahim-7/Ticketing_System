import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  name: string;
  category: string;
  description: string;
  agent: string;
  user: string;
  status: "pending" | "in progress" | "rejected" | "done";
  role: "user" | "agent" | "admin";
}

const Ticket = ({
  name,
  category,
  description,
  agent,
  user,
  status,
  role,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 80;
  const isLong = description.length > MAX_LENGTH;

  const statusColors: any = {
    pending: "bg-yellow-100 text-yellow-700",
    "in progress": "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    done: "bg-green-100 text-green-700",
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300">
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-800">{name}</h2>

          {/* DESCRIPTION INLINE */}
          <div className="text-sm text-gray-500 max-w-[80%]">
            {expanded || !isLong
              ? description
              : description.slice(0, MAX_LENGTH) + "..."}

            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                className="
                  ml-1 cursor-pointer italic text-transparent bg-clip-text 
                  bg-gradient-to-r from-blue-500 to-purple-600
                  hover:opacity-80 transition
                "
              >
                {expanded ? "show less" : "show more"}
              </span>
            )}
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
            statusColors[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 flex-wrap">
          {/* CATEGORY */}
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
            {category}
          </span>

          {/* AGENT */}
          {(role === "user" || role === "admin") && (
            <span className="text-gray-600">
              <span className="font-medium">Agent:</span>{" "}
              {agent === "" ? "----" : agent}
            </span>
          )}

          {/* USER */}
          {(role === "agent" || role === "admin") && (
            <span className="text-gray-600">
              <span className="font-medium">User:</span> {user}
            </span>
          )}
        </div>

        {/* CONTACT BUTTON */}
        <abbr
          title={
            agent === "" || status === "rejected" || status === "done"
              ? "No contact available"
              : `Contact ${role === "user" ? "agent" : "user"}`
          }
        >
          <button
            disabled={agent === ""}
            className={`
      p-2 rounded-lg text-white transition
      ${
        agent === "" || status === "rejected" || status === "done"
          ? "bg-green-400 opacity-50 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600 cursor-pointer"
      }
    `}
          >
            <MessageCircle size={18} />
          </button>
        </abbr>
      </div>
    </div>
  );
};

export default Ticket;
