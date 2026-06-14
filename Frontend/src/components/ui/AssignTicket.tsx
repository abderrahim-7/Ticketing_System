import { useState } from "react";
import { UserPlus, X } from "lucide-react";

interface Props {
  title: string;
  category: string;
  description: string;
  agent: string;
  user: string;
  status: "PENDING" | "IN_PROGRESS" | "REJECTED" | "DONE";

  onReject: () => void;
  onAssign: () => void;
}

const AssignTicket = ({
  title,
  category,
  description,
  agent,
  user,
  status,
  onReject,
  onAssign,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 80;
  const isLong = description.length > MAX_LENGTH;

  const statusColors: any = {
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
    DONE: "bg-green-100 text-green-700",
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300">
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>

          <div className="text-sm text-gray-500 max-w-[100%]">
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
          {/* CATEGORY (same style as your original) */}
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
            {category}
          </span>

          {/* USER */}
          <span className="text-gray-600">
            <span className="font-medium">User:</span> {user}
          </span>

          {/* AGENT */}
          <span className="text-gray-600">
            <span className="font-medium">Agent:</span>{" "}
            {agent === "" || agent === null ? "----" : agent}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* REJECT */}
          <abbr title="Reject ticket">
            <button
              onClick={onReject}
              className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </abbr>

          {/* ASSIGN */}
          <abbr title="Assign ticket">
            <button
              onClick={onAssign}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
            >
              <UserPlus size={18} />
            </button>
          </abbr>
        </div>
      </div>
    </div>
  );
};

export default AssignTicket;
