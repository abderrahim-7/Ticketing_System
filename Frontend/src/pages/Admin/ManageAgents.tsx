import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import { Check, X, ShieldBan, ShieldCheck, UserRound } from "lucide-react";
import {
  activateAgent,
  activateAccount,
  disableAccount,
  getAllAgents,
  getAllUsers,
  refuseAgent,
} from "../../api/admin";
import Toast from "../../components/ui/Toast";

const ManageAgents = () => {
  type Agent = {
    id: number;
    username: string;
    email: string;
    active: boolean;
    enabled: boolean;
  };

  type User = {
    id: number;
    username: string;
    email: string;
    enabled: boolean;
  };

  const [agents, setAgents] = useState<Agent[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchAccounts = async () => {
    try {
      const resAgents = await getAllAgents();
      setAgents(resAgents.data);

      const resUsers = await getAllUsers();
      setUsers(resUsers.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);

      setToast({
        type: "error",
        message: "Failed to fetch accounts",
      });
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleActivateAgent = async (id: number) => {
    try {
      console.log(id);
      await activateAgent(id);

      setToast({
        type: "success",
        message: "Agent activated successfully",
      });

      fetchAccounts();
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to activate agent",
      });
    }
  };

  const handleRefuseAgent = async (id: number) => {
    try {
      await refuseAgent(id);

      setToast({
        type: "success",
        message: "Agent refused successfully",
      });

      fetchAccounts();
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to refuse agent",
      });
    }
  };

  const handleBlockAccount = async (id: number) => {
    try {
      await disableAccount(id);

      setToast({
        type: "success",
        message: "Account blocked successfully",
      });

      fetchAccounts();
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to block account",
      });
    }
  };

  const handleUnblockAccount = async (id: number) => {
    try {
      await activateAccount(id);

      setToast({
        type: "success",
        message: "Account unblocked successfully",
      });

      fetchAccounts();
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to unblock account",
      });
    }
  };

  const pendingAgents = agents.filter(
    (agent) => !agent.active && agent.enabled,
  );

  const accounts = [...users, ...agents.filter((agent) => agent.active)];

  return (
    <GlobalLayout>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col gap-8 px-10">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Accounts Management
        </h1>

        {/* ========================================= */}
        {/* AGENT ACTIVATION SECTION */}
        {/* ========================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-5">
            Pending Agent Activations
          </h2>

          <div className="flex flex-col gap-3">
            {pendingAgents.length === 0 ? (
              <p className="text-gray-500">No pending agents found.</p>
            ) : (
              pendingAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <UserRound size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">{agent.username}</p>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* ACTIVATE */}
                    <button
                      onClick={() => handleActivateAgent(agent.id)}
                      className="
                        group relative
                        p-2 rounded-lg
                        bg-green-100 text-green-600
                        hover:bg-green-200
                        transition cursor-pointer
                      "
                    >
                      <Check size={20} />

                      <span
                        className="
                          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                          px-2 py-1 text-xs text-white bg-gray-800 rounded
                          opacity-0 group-hover:opacity-100
                          pointer-events-none whitespace-nowrap
                          transition
                        "
                      >
                        Activate
                      </span>
                    </button>

                    {/* REFUSE */}
                    <button
                      onClick={() => handleRefuseAgent(agent.id)}
                      className="
                        group relative
                        p-2 rounded-lg
                        bg-red-100 text-red-600
                        hover:bg-red-200
                        transition cursor-pointer
                      "
                    >
                      <X size={20} />

                      <span
                        className="
                          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                          px-2 py-1 text-xs text-white bg-gray-800 rounded
                          opacity-0 group-hover:opacity-100
                          pointer-events-none whitespace-nowrap
                          transition
                        "
                      >
                        Refuse
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* ACCOUNT MANAGEMENT */}
        {/* ========================================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-5">
            Block / Unblock Accounts
          </h2>

          <div className="flex flex-col gap-3">
            {accounts.length === 0 ? (
              <p className="text-gray-500">No accounts found.</p>
            ) : (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <UserRound size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">{account.username}</p>
                      <p className="text-sm text-gray-500">{account.email}</p>
                    </div>
                  </div>

                  {!account.enabled ? (
                    <button
                      onClick={() => handleUnblockAccount(account.id)}
                      className="
                        flex items-center gap-2
                        px-4 py-2 rounded-lg
                        bg-green-100 text-green-700
                        hover:bg-green-200
                        transition cursor-pointer
                      "
                    >
                      <ShieldCheck size={18} />
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockAccount(account.id)}
                      className="
                        flex items-center gap-2
                        px-4 py-2 rounded-lg
                        bg-red-100 text-red-700
                        hover:bg-red-200
                        transition cursor-pointer
                      "
                    >
                      <ShieldBan size={18} />
                      Block
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ManageAgents;
