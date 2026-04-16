import React, { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import Ticket from "../../components/ui/Ticket";

interface TicketData {
  name: string;
  category: string;
  description: string;
  agent: string;
  user: string;
  status: "pending" | "in progress" | "rejected" | "done";
  role: "user" | "agent" | "admin";
}

const Tickets = () => {
  const tickets: TicketData[] = [
    {
      name: "Electrical Outage",
      category: "Technical Issue",
      description:
        "The electricity isn't working in the IT departement in the second flore, please fix it as soon as possible.",
      agent: "agent 009",
      user: "Abderrahim",
      status: "in progress",
      role: "agent",
    },
    {
      name: "Software Installation",
      category: "Technical Issue",
      description:
        "I need the latest version of Photoshop installed on my workstation for a project deadline.",
      agent: "agent 009",
      user: "Mbappe",
      status: "in progress",
      role: "agent",
    },
    {
      name: "Password Reset",
      category: "Account Problem",
      description:
        "I forgot my password and can't access my account. Please reset it for me.",
      agent: "agent 009",
      user: "Gustave",
      status: "done",
      role: "agent",
    },
    {
      name: "Network Issue",
      category: "Technical Issue",
      description:
        "I'm having trouble connecting to the company network. Can you help me resolve this?",
      agent: "agent 009",
      user: "Luis",
      status: "done",
      role: "agent",
    },
  ];

  const currentTickets = tickets.filter((t) => t.status === "in progress");

  const historyTickets = tickets.filter((t) => t.status === "done");

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
          Tickets
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

export default Tickets;

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
