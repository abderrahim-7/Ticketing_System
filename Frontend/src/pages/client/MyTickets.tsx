import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import Ticket from "../../components/ui/Ticket";
import { getUserTickets } from "../../api/user";
import { useAuth } from "../../contexts/AuthContext";

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

const MyTickets = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);

  const { role } = useAuth();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const res = await getUserTickets();
        setTickets(
          res.data.map((ticket: TicketData) => ({
            ...ticket,
            role,
          })),
        );
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchUserTickets();
  }, []);

  const currentTickets = tickets.filter(
    (t) => t.status === "PENDING" || t.status === "IN_PROGRESS",
  );

  const historyTickets = tickets.filter(
    (t) => t.status === "DONE" || t.status === "REJECTED",
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <GlobalLayout>
      <div
        className={`
          flex flex-col items-start px-10
          transition-all duration-500 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
          My Tickets
        </h1>

        <div className="w-full flex flex-col gap-6">
          {/* CURRENT TICKETS */}
          <SectionTitle title="Current Tickets" />

          <div className="flex flex-col gap-5">
            {currentTickets.map((ticket, index) => (
              <div
                key={index}
                className={`
        transform transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Ticket {...ticket} />
              </div>
            ))}
          </div>

          {/* HISTORY */}
          <SectionTitle title="History" />

          <div className="flex flex-col gap-5">
            {historyTickets.map((ticket, index) => (
              <div
                key={index}
                className={`
        transform transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
                style={{
                  transitionDelay: `${(index + currentTickets.length) * 100}ms`,
                }}
              >
                <Ticket {...ticket} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default MyTickets;

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gray-300" />
      <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
};
