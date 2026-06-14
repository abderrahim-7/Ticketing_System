import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";

interface Props {
  id: number;
  title: string;
  category: string;
  description: string;
  agent: string;
  user: string;
  status: "PENDING" | "IN_PROGRESS" | "REJECTED" | "DONE";
  role: "USER" | "AGENT" | "ADMIN";
  onSolve?: (id: number) => void;
  loading?: boolean;
}

const Ticket = ({
  id,
  title,
  category,
  description,
  agent,
  user,
  status,
  role,
  onSolve,
  loading,
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
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>

          <div className="text-sm text-gray-500">
            {expanded || !isLong
              ? description
              : description.slice(0, MAX_LENGTH) + "..."}

            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                className="ml-1 cursor-pointer italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
              >
                {expanded ? "show less" : "show more"}
              </span>
            )}
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
            {category}
          </span>

          {(role === "USER" || role === "ADMIN") && (
            <span className="text-gray-600">
              <span className="font-medium">Agent:</span> {agent || "----"}
            </span>
          )}

          {(role === "AGENT" || role === "ADMIN") && (
            <span className="text-gray-600">
              <span className="font-medium">User:</span> {user}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* SOLVE BUTTON */}
          {status === "IN_PROGRESS" && role === "AGENT" && (
            <abbr title="Mark as solved">
              <button
                onClick={() => onSolve?.(id)}
                disabled={loading}
                className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition disabled:opacity-50"
              >
                <CheckCircle size={18} />
              </button>
            </abbr>
          )}

          {/* MESSAGE */}
          <abbr title="Contact">
            <button className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition">
              <MessageCircle size={18} />
            </button>
          </abbr>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
