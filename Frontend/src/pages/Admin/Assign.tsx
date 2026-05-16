import { useState } from "react";
import AgentCard from "../../components/ui/AgentCard";
import AssignTicket from "../../components/ui/AssignTicket";
import GlobalLayout from "../../layout/GlobalLayout";

const Assign = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const tickets: {
    id: number;
    name: string;
    category: string;
    description: string;
    status: "pending" | "in progress" | "rejected" | "done";
    agent: string;
    user: string;
  }[] = [
    {
      id: 1,
      name: "Network issue",
      category: "Network",
      description: "User cannot access internet...",
      status: "pending",
      agent: "",
      user: "John User",
    },
  ];

  const agents = [
    {
      id: "a1",
      name: "John Doe",
      categories: ["Network", "Security"],
      skills: ["Linux", "Networking"],
      currentLoad: 4,
      maxLoad: 6,
    },
    {
      id: "a2",
      name: "Sarah Smith",
      categories: ["Technical Issue"],
      skills: ["Docker", "Troubleshooting"],
      currentLoad: 2,
      maxLoad: 6,
    },
  ];

  return (
    <GlobalLayout>
      <div className="px-10 flex flex-col gap-6">
        {/* TITLE */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          Assign Tickets
        </h1>

        {/* TICKETS */}
        <div className="grid grid-cols-1 gap-4">
          {tickets.map((t) => (
            <AssignTicket
              key={t.id}
              {...t}
              onReject={() => {
                console.log("reject", t.id);
              }}
              onAssign={() => setSelectedTicket(t)}
            />
          ))}
        </div>

        {/* ASSIGN MODAL */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
            <div className="bg-gray-50 rounded-2xl w-full max-w-3xl p-6 flex flex-col gap-5 shadow-xl">
              <h2 className="text-xl font-bold text-gray-800">
                Assign Ticket: {selectedTicket.name}
              </h2>

              {/* AGENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((a) => (
                  <AgentCard
                    key={a.id}
                    agent={a}
                    onAssign={() => {
                      console.log(
                        "assign ticket",
                        selectedTicket.id,
                        "to agent",
                        a.id,
                      );
                      setSelectedTicket(null);
                    }}
                  />
                ))}
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="self-end px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
};

export default Assign;
