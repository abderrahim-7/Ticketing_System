import { useState, useEffect } from "react";
import GlobalLayout from "../layout/GlobalLayout";
import Toast from "../components/ui/Toast";
import { Lock, Save } from "lucide-react";
import { changePassword } from "../api/auth";

const Settings = () => {
  const [mounted, setMounted] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setToast({
        type: "error",
        message: "Please fill all fields",
      });
      return;
    }

    if (newPassword.length < 4) {
      setToast({
        type: "error",
        message: "Password must contain at least 4 characters",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);

      setToast({
        type: "success",
        message: "Password changed successfully",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Failed to change password",
      });
    }
  };

  return (
    <GlobalLayout>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className={`
          flex flex-col items-start px-10 gap-6
          transition-all duration-500 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Settings
        </h1>

        <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Lock size={24} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Change Password</h2>
              <p className="text-gray-500 text-sm">
                Update your account password and keep your account secure.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CURRENT PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="
                    p-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2
                    focus:ring-purple-500 transition
                  "
                />
              </div>

              {/* NEW PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="
                    p-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2
                    focus:ring-purple-500 transition
                  "
                />

                <span className="text-xs text-gray-500">
                  Minimum 4 characters
                </span>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="
                  p-3 border border-gray-300 rounded-xl
                  focus:outline-none focus:ring-2
                  focus:ring-purple-500 transition
                "
              />
            </div>

            {/* BUTTON */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="
                  flex items-center gap-2
                  px-8 py-3
                  rounded-xl
                  text-white
                  font-semibold
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  hover:opacity-90
                  transition
                "
              >
                <Save size={18} />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default Settings;
