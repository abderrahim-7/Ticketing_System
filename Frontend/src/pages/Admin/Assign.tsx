import { useEffect, useState } from "react";
import AgentCard from "../../components/ui/AgentCard";
import AssignTicket from "../../components/ui/AssignTicket";
import GlobalLayout from "../../layout/GlobalLayout";
import {
  assignTicket,
  getAllAgents,
  getAllTickets,
  getTicketsByAgent,
  rejectTicket,
} from "../../api/admin";

import Toast from "../../components/ui/Toast";

const Assign = () => {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  type ticket = {
    id: number;
    title: string;
    category: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "REJECTED" | "DONE";
    agent: string;
    user: string;
  };

  type agent = {
    id: number;
    username: string;
    categories: string[];
    skills: string[];
    currentLoad: number;
  };

  const [tickets, setTickets] = useState<ticket[]>([]);
  const [agents, setAgents] = useState<agent[]>([]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const getTickets = async () => {
    try {
      const response = await getAllTickets();

      const pendingTickets = response.data.filter(
        (t: any) => t.status === "PENDING",
      );

      setTickets(pendingTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      showToast("error", "Failed to load tickets");
    }
  };

  const getAgents = async () => {
    try {
      const response = await getAllAgents();

      const agentsWithLoad = await Promise.all(
        response.data.map(async (agent: any) => {
          const ticketsResponse = await getTicketsByAgent(agent.id);

          return {
            ...agent,
            currentLoad: ticketsResponse.data.length,
          };
        }),
      );

      setAgents(agentsWithLoad);
    } catch (error) {
      console.error("Error fetching agents:", error);
      showToast("error", "Failed to load agents");
    }
  };

  useEffect(() => {
    getTickets();
    getAgents();
  }, []);

  // =========================
  // ASSIGN
  // =========================
  const handleAssignTicket = async (ticketId: number, agentId: number) => {
    try {
      await assignTicket(ticketId, agentId);

      showToast("success", "Ticket assigned successfully");

      // remove ticket instantly from UI
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));

      setSelectedTicket(null);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to assign ticket");
    }
  };

  // =========================
  // REJECT
  // =========================
  const handleRejectTicket = async (ticketId: number) => {
    try {
      await rejectTicket(ticketId);

      showToast("success", "Ticket rejected");

      // remove instantly
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to reject ticket");
    }
  };

  return (
    <GlobalLayout>
      <div className="px-10 flex flex-col gap-6">
        {/* TOAST */}
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}

        {/* TITLE */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Assign Tickets
        </h1>

        {/* TICKETS */}
        <div className="grid grid-cols-1 gap-4">
          {tickets.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-400 text-lg font-medium">
                No pending tickets
              </p>
            </div>
          ) : (
            tickets.map((t) => (
              <AssignTicket
                key={t.id}
                {...t}
                onReject={() => handleRejectTicket(t.id)}
                onAssign={() => setSelectedTicket(t)}
              />
            ))
          )}
        </div>

        {/* MODAL */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
            <div className="bg-gray-50 rounded-2xl w-full max-w-4xl shadow-xl flex flex-col max-h-[85vh]">
              {/* HEADER */}
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">
                  Assign Ticket: {selectedTicket.title}
                </h2>
              </div>

              {/* AGENTS */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agents.map((a) => (
                    <AgentCard
                      key={a.id}
                      agent={a}
                      onAssign={() =>
                        handleAssignTicket(selectedTicket.id, a.id)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="p-6 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
};

export default Assign;
