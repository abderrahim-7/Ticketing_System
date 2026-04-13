import GlobalLayout from "../layout/GlobalLayout";
import { user } from "../1data/user";

const Home = () => {
  return (
    <GlobalLayout>
      <div className="p-10 flex flex-col items-center">
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-12">
          Welcome back, {user.username}
        </h1>

        {/* CARDS LAYOUT */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            <HomeCard
              color="purple"
              title="Create Ticket"
              description="Open a new support request"
            />

            <HomeCard
              color="green"
              title="My Tickets"
              description="View and track your tickets"
            />

            <HomeCard
              color="blue"
              title="Conversations"
              description="Chat with agents"
            />
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
}

const HomeCard = ({ color, title, description }: HomeCardProps) => {
  const colors = {
    purple: "bg-purple-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  return (
    <div
      className={`
        ${colors[color]}
        text-white
        w-72 md:w-80
        p-6
        rounded-2xl
        shadow-lg
        cursor-pointer
        transform
        transition-all
        hover:scale-105
        hover:shadow-2xl
      `}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-90 mt-2">{description}</p>
    </div>
  );
};

export default Home;
