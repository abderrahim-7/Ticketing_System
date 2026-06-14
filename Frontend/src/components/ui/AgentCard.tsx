import { CheckCircle } from "lucide-react";

interface Agent {
  id: number;
  username: string;
  categories: string[];
  skills: string[];
  currentLoad: number;
}

interface Props {
  agent: Agent;
  onAssign: () => void;
  maxLoad?: number;
}

const AgentCard = ({ agent, onAssign, maxLoad = 6 }: Props) => {
  const loadPercent = (agent.currentLoad / maxLoad) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-xl transition">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">{agent.username}</h2>

        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
          {agent.currentLoad}/{maxLoad}
        </span>
      </div>

      {/* LOAD BAR */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            loadPercent < 70
              ? "bg-green-500"
              : loadPercent < 100
                ? "bg-yellow-500"
                : "bg-red-500"
          }`}
          style={{ width: `${loadPercent}%` }}
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex flex-wrap gap-2">
        {agent.categories.map((c, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
          >
            {c}
          </span>
        ))}
      </div>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2">
        {agent.skills.map((s, i) => (
          <span
            key={i}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
          >
            {s}
          </span>
        ))}
      </div>

      {/* ASSIGN BUTTON */}
      <button
        onClick={onAssign}
        disabled={agent.currentLoad >= maxLoad}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-semibold transition
          ${
            agent.currentLoad >= maxLoad
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
      >
        <CheckCircle size={18} />
        Assign
      </button>
    </div>
  );
};

export default AgentCard;
