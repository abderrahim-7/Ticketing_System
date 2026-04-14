import GlobalLayout from "../layout/GlobalLayout";
import { user } from "../1data/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <GlobalLayout>
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-12">
          Welcome back, {user.username}
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {user.role === "user" && (
              <>
                <HomeCard
                  color="purple"
                  title="Create Ticket"
                  description="Open a new support request"
                  to="/create-ticket"
                  delay={100}
                />
                <HomeCard
                  color="green"
                  title="My Tickets"
                  description="View and track your tickets"
                  to="/my-tickets"
                  delay={0}
                />
                <HomeCard
                  color="blue"
                  title="Conversations"
                  description="Chat with agents"
                  to="/chat"
                  delay={200}
                />
              </>
            )}
            {user.role === "agent" && (
              <>
                <HomeCard
                  color="green"
                  title="Assigned Tickets"
                  description="View and track your assigned tickets"
                  to="/agent/tickets"
                  delay={100}
                />
                <HomeCard
                  color="blue"
                  title="Conversations"
                  description="Chat with clients about their tickets"
                  to="/chat"
                  delay={0}
                />
                <HomeCard
                  color="purple"
                  title="Contact Admin"
                  description="Reach out to the admin for support about a ticket"
                  to="/chat"
                  delay={200}
                />
              </>
            )}
            {user.role === "admin" && (
              <>
                <HomeCard
                  color="purple"
                  title="Assign Ticket"
                  description="Validate and assign a ticket to an agent"
                  to="/admin/assign"
                  delay={100}
                />
                <HomeCard
                  color="green"
                  title="Manage Agents"
                  description="View and manage your agents"
                  to="/admin/manage-agents"
                  delay={0}
                />
                <HomeCard
                  color="blue"
                  title="Monitoring"
                  description="Monitor system performance and ticket resolution stats"
                  to="/admin/monitor"
                  delay={200}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

interface HomeCardProps {
  color: "purple" | "green" | "blue";
  title: string;
  description: string;
  to: string;
  delay?: number;
}

import { useEffect, useState } from "react";

const HomeCard = ({ color, title, description, to, delay }: HomeCardProps) => {
  const colors = {
    purple: "bg-purple-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      onClick={() => navigate(to)}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        ${colors[color]}
        text-white
        w-72 md:w-80
        p-6
        rounded-2xl
        shadow-lg
        cursor-pointer
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-2xl

        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-90 mt-2">{description}</p>
    </div>
  );
};

export default Home;
