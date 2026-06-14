import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import Ticket from "../../components/ui/Ticket";
import { getAgentTickets, solveTicket } from "../../api/agent";
import Toast from "../../components/ui/Toast";

interface TicketData {
  id: number;
  title: string;
  category: string;
  description: string;
  agent: string;
  user: string;
  status: "PENDING" | "IN_PROGRESS" | "REJECTED" | "DONE";
  role: "USER" | "AGENT" | "ADMIN";
}

const Tickets = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
  };

  const fetchTickets = async () => {
    try {
      const response = await getAgentTickets();

      setTickets(
        response.data.map((t: any) => ({
          ...t,
          role: "AGENT",
        })),
      );
    } catch (error) {
      showToast("error", "Failed to fetch tickets");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSolve = async (id: number) => {
    try {
      setLoadingId(id);

      await solveTicket(id);

      // 🔥 instant UI update (NO refresh needed)
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "DONE" } : t)),
      );

      showToast("success", "Ticket marked as solved");
    } catch (error) {
      showToast("error", "Failed to solve ticket");
    } finally {
      setLoadingId(null);
    }
  };

  const currentTickets = tickets.filter((t) => t.status === "IN_PROGRESS");
  const historyTickets = tickets.filter((t) => t.status === "DONE");

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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Tickets
        </h1>

        {/* CURRENT */}
        <div className="flex flex-col gap-4">
          {currentTickets.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <span className="text-gray-400 text-lg font-medium">
                No tickets assigned
              </span>
            </div>
          ) : (
            currentTickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                {...ticket}
                loading={loadingId === ticket.id}
                onSolve={handleSolve}
              />
            ))
          )}
        </div>

        {/* HISTORY */}
        <div className="flex flex-col gap-4">
          {historyTickets.map((ticket) => (
            <Ticket key={ticket.id} {...ticket} />
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Tickets;
