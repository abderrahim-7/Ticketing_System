import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Users, UserCheck, Ticket, TrendingUp } from "lucide-react";
import {
  fetchUsersStats,
  fetchAgentsStats,
  fetchTicketsByCategory,
} from "../../api/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserStat {
  id: number;
  username: string;
  submitted: number;
  rejected: number;
  done: number;
  inProgress: number;
}

interface AgentStat {
  id: number;
  username: string;
  solved: number;
  inProgress: number;
  avgResolutionTime: string;
}

interface CategoryStat {
  category: string;
  count: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PIE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#ddd6fe",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
];

const AVG_TIME_TO_MINUTES = (t: string): number => {
  if (!t) return 0;

  const match = t.match(/(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?/i);

  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;

  return hours * 60 + minutes;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl text-white ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
    {children}
  </h2>
);

// ─── Custom Pie label ─────────────────────────────────────────────────────────

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.06) return null;
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ─── Monitor ─────────────────────────────────────────────────────────────────

const Monitor = () => {
  const [users, setUsers] = useState<UserStat[]>([]);
  const [agents, setAgents] = useState<AgentStat[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [uRes, aRes, cRes] = await Promise.all([
          fetchUsersStats(),
          fetchAgentsStats(),
          fetchTicketsByCategory(),
        ]);
        setUsers(uRes.data);
        setAgents(aRes.data);
        setCategoryData(cRes.data);
      } catch (e) {
        console.error("Failed to load monitor data", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalTickets = categoryData.reduce((s, c) => s + c.count, 0);
  const totalUsers = users.length;
  const totalAgents = agents.length;
  const totalSolved = agents.reduce((s, a) => s + a.solved, 0);

  const agentBarData = agents.map((a) => ({
    name: a.username.replace("agent_", ""),
    minutes: AVG_TIME_TO_MINUTES(a.avgResolutionTime),
    label: a.avgResolutionTime,
  }));

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-sm">
          <p className="font-semibold text-gray-700">{d.name}</p>
          <p className="text-blue-600">Avg: {d.label}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <GlobalLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="flex flex-col gap-8 px-10 pb-10 opacity-0 animate-[pageIn_0.5s_ease-out_forwards]">
        {/* Page title */}
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Monitor
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard
            icon={Users}
            label="Total Users"
            value={totalUsers}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <SummaryCard
            icon={UserCheck}
            label="Total Agents"
            value={totalAgents}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <SummaryCard
            icon={Ticket}
            label="Total Tickets"
            value={totalTickets}
            color="bg-gradient-to-r from-indigo-500 to-indigo-600"
          />
          <SummaryCard
            icon={TrendingUp}
            label="Solved Tickets"
            value={totalSolved}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
        </div>

        {/* Users table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <SectionTitle>Users — Ticket Activity</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">Username</th>
                  <th className="pb-3 font-semibold text-center">Submitted</th>
                  <th className="pb-3 font-semibold text-center">
                    In Progress
                  </th>
                  <th className="pb-3 font-semibold text-center">Done</th>
                  <th className="pb-3 font-semibold text-center">Rejected</th>
                  <th className="pb-3 font-semibold">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => {
                  const total = u.submitted || 1;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-800">
                        {u.username}
                      </td>
                      <td className="py-3 text-center text-gray-600">
                        {u.submitted}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          {u.inProgress}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          {u.done}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                          {u.rejected}
                        </span>
                      </td>
                      <td className="py-3 w-40">
                        {/* Stacked mini bar */}
                        <div className="flex h-2 rounded-full overflow-hidden gap-px">
                          <div
                            className="bg-green-400"
                            style={{ width: `${(u.done / total) * 100}%` }}
                          />
                          <div
                            className="bg-blue-400"
                            style={{
                              width: `${(u.inProgress / total) * 100}%`,
                            }}
                          />
                          <div
                            className="bg-red-400"
                            style={{ width: `${(u.rejected / total) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agents table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <SectionTitle>Agents — Performance</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-semibold">Agent</th>
                  <th className="pb-3 font-semibold text-center">Solved</th>
                  <th className="pb-3 font-semibold text-center">
                    In Progress
                  </th>
                  <th className="pb-3 font-semibold text-center">
                    Avg Resolution Time
                  </th>
                  <th className="pb-3 font-semibold">Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {agents.map((a) => {
                  const total = a.solved + a.inProgress || 1;
                  const loadPct = Math.round((a.inProgress / total) * 100);
                  return (
                    <tr key={a.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-gray-800">
                        {a.username}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          {a.solved}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          {a.inProgress}
                        </span>
                      </td>
                      <td className="py-3 text-center text-gray-600">
                        {a.avgResolutionTime}
                      </td>
                      <td className="py-3 w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all"
                              style={{ width: `${loadPct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">
                            {loadPct}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie chart — tickets by category */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <SectionTitle>Tickets by Category</SectionTitle>
            <div className="flex justify-center">
              <PieChart width={320} height={280}>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value ?? 0, String(name)]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-gray-600">{value}</span>
                  )}
                />
              </PieChart>
            </div>
          </div>

          {/* Bar chart — avg resolution time per agent */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <SectionTitle>Avg Resolution Time per Agent</SectionTitle>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={agentBarData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `${v}m`}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                  {agentBarData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index % 2 === 0 ? "#6366f1" : "#8b5cf6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </GlobalLayout>
  );
};

export default Monitor;
