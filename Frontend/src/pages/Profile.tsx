import React from "react";
import GlobalLayout from "../layout/GlobalLayout";
import ProfileImage from "../assets/profileImage.png";
import { user, agent, admin } from "../1data/user";
import {
  CheckCircle,
  Clock,
  Star,
  FileText,
  BarChart,
  Tag,
  Wrench,
} from "lucide-react";

const Profile = () => {
  const currentUser = user;

  return (
    <GlobalLayout>
      <div
        className="
    flex flex-col items-start px-10 gap-5
    opacity-0 animate-[pageIn_0.6s_ease-out_forwards]
  "
      >
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8 opacity-0 animate-[fadeUp_0.5s_ease-out_0.1s_forwards]">
          Profile
        </h1>

        {/* General Infos */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex opacity-0 animate-[fadeUp_0.5s_ease-out_0.2s_forwards]">
          <div className="flex flex-col p-5 gap-4 w-[20%] items-center">
            <div className="w-[90%] aspect-square rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-600">
              <img
                src={ProfileImage}
                alt="profile img"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <h3 className="text-center text-xs italic text-gray-500">
              {"Last login: " + currentUser.lastLogin}
            </h3>
          </div>

          <div className="flex flex-col p-5 w-[80%] items-start gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentUser.username}
            </h1>

            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <h2>
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {currentUser.email}
              </h2>

              <h2>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {currentUser.phoneNumber}
              </h2>

              <h2>
                <span className="font-medium text-gray-700">Department:</span>{" "}
                {currentUser.departement}
              </h2>

              <h2>
                <span className="font-medium text-gray-700">Job title:</span>{" "}
                {currentUser.jobTitle}
              </h2>
            </div>
          </div>

          <div className="flex justify-start p-5">
            <div
              className={`
          rounded-xl w-[90%] h-fit flex items-center justify-center
          px-4 py-2 text-sm font-semibold text-white shadow-sm
          ${
            currentUser.role === "agent" &&
            "bg-gradient-to-r from-blue-500 to-blue-700"
          }
          ${
            currentUser.role === "admin" &&
            "bg-gradient-to-r from-purple-500 to-purple-700"
          }
          ${
            currentUser.role === "user" &&
            "bg-gradient-to-r from-green-500 to-green-600"
          }
        `}
            >
              <span className="capitalize tracking-wide">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {(currentUser.role === "user" || currentUser.role === "agent") && (
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.3s_forwards]">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Statistics
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentUser.role === "user" && (
                <>
                  <StatCard
                    icon={FileText}
                    label="Submitted"
                    value={currentUser.subbmitedTickets}
                    color="blue"
                  />

                  <StatCard
                    icon={CheckCircle}
                    label="Accepted"
                    value={currentUser.acceptedTickets}
                    color="green"
                  />

                  <StatCard
                    icon={BarChart}
                    label="Acceptance Rate"
                    value={
                      currentUser.subbmitedTickets > 0
                        ? (
                            (currentUser.acceptedTickets /
                              currentUser.subbmitedTickets) *
                            100
                          ).toFixed(1) + "%"
                        : "0%"
                    }
                    color="purple"
                  />
                </>
              )}

              {currentUser.role === "agent" && (
                <>
                  <StatCard
                    icon={CheckCircle}
                    label="Solved"
                    value={currentUser.solvedTickets}
                    color="green"
                  />

                  <StatCard
                    icon={Clock}
                    label="Avg Time"
                    value={currentUser.AvgTime}
                    color="blue"
                  />

                  <StatCard
                    icon={Star}
                    label="Rating"
                    value={currentUser.rating}
                    color="purple"
                  />
                </>
              )}
            </div>
          </div>
        )}

        {currentUser.role === "agent" && (
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.4s_forwards]">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Expertise
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Tag size={18} className="text-purple-600" />
                  <span>Categories</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentUser.categories.map((cat: string, index: number) => (
                    <span
                      key={index}
                      className="
                px-3 py-1 text-sm rounded-full
                bg-purple-100 text-purple-700
                transition
              "
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Wrench size={18} className="text-blue-600" />
                  <span>Skills</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="
                px-3 py-1 text-sm rounded-full
                bg-blue-100 text-blue-700
                transition
              "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* animations */}
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </GlobalLayout>
  );
};

export default Profile;

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: "blue" | "green" | "purple";
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => {
  const colors = {
    blue: "from-blue-500 to-blue-700",
    green: "from-green-500 to-green-700",
    purple: "from-purple-500 to-purple-700",
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:shadow-md transition">
      {/* ICON */}
      <div
        className={`p-3 rounded-lg text-white bg-gradient-to-r ${colors[color]}`}
      >
        <Icon size={18} />
      </div>

      {/* TEXT */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-lg font-bold text-gray-800">{value}</span>
      </div>
    </div>
  );
};
