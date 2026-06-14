import React, { useEffect, useState, useRef } from "react";
import GlobalLayout from "../layout/GlobalLayout";
import ProfileImage from "../assets/profileImage.png";
import {
  CheckCircle,
  Clock,
  Star,
  FileText,
  BarChart,
  Tag,
  Wrench,
  Pencil,
  X,
  Check,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getAllCategories,
  getUserProfile,
  getUserStatistics,
  updateUserProfile,
} from "../api/user";
import {
  getAgentProfile,
  getAgentStatistics,
  updateAgentCategories,
  updateAgentProfile,
  updateAgentSkills,
} from "../api/agent";
import { getAllSkills } from "../api/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TagItem {
  id: number;
  name: string;
}

// ─── Toast ───────────────────────────────────────────────────────────────────

type ToastType = "success" | "error";

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

const Toast = ({
  toasts,
  remove,
}: {
  toasts: ToastState[];
  remove: (id: number) => void;
}) => (
  <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
          animate-[fadeUp_0.3s_ease-out_forwards]
          ${t.type === "success" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-red-500 to-red-600"}
        `}
      >
        {t.type === "success" ? <Check size={16} /> : <X size={16} />}
        <span>{t.message}</span>
        <button
          onClick={() => remove(t.id)}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const counter = useRef(0);

  const show = (message: string, type: ToastType = "success") => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => remove(id), 3500);
  };

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, show, remove };
};

// ─── Inline editable field ───────────────────────────────────────────────────

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (val: string) => Promise<void>;
  showToast: (msg: string, type: ToastType) => void;
}

const EditableField = ({
  label,
  value,
  onSave,
  showToast,
}: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = async () => {
    if (!draft.trim()) {
      showToast(`${label} cannot be empty.`, "error");
      return;
    }
    setLoading(true);
    try {
      await onSave(draft.trim());
      showToast(`${label} updated.`, "success");
      setEditing(false);
    } catch {
      showToast(`Failed to update ${label}.`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 group">
      <span className="font-medium text-gray-700 min-w-[90px]">{label}:</span>
      {editing ? (
        <div className="flex items-center gap-2 flex-1">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1 border border-blue-300 rounded-lg px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-green-600 hover:text-green-700 transition disabled:opacity-40"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <span className="flex-1">
            {value || <span className="italic text-gray-400">—</span>}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Username editable ────────────────────────────────────────────────────────

interface EditableUsernameProps {
  value: string;
  onSave: (val: string) => Promise<void>;
  showToast: (msg: string, type: ToastType) => void;
}

const EditableUsername = ({
  value,
  onSave,
  showToast,
}: EditableUsernameProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = async () => {
    if (!draft.trim()) {
      showToast("Username cannot be empty.", "error");
      return;
    }
    setLoading(true);
    try {
      await onSave(draft.trim());
      showToast("Username updated.", "success");
      setEditing(false);
    } catch {
      showToast("Failed to update username.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2 group">
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="text-2xl font-bold text-gray-800 border-b-2 border-blue-400 bg-transparent focus:outline-none w-48"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="text-green-600 hover:text-green-700 transition disabled:opacity-40"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">{value}</h1>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition"
          >
            <Pencil size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Tag multi-select modal ───────────────────────────────────────────────────

interface TagSelectModalProps {
  title: string;
  all: TagItem[];
  selected: TagItem[];
  onClose: () => void;
  onSave: (selected: TagItem[]) => Promise<void>;
  showToast: (msg: string, type: ToastType) => void;
  color: "purple" | "blue";
}

const TagSelectModal = ({
  title,
  all,
  selected,
  onClose,
  onSave,
  showToast,
  color,
}: TagSelectModalProps) => {
  const [draft, setDraft] = useState<TagItem[]>(selected);
  const [loading, setLoading] = useState(false);

  const toggle = (item: TagItem) =>
    setDraft((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item],
    );

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(draft);
      showToast(`${title} updated.`, "success");
      onClose();
    } catch {
      showToast(`Failed to update ${title}.`, "error");
    } finally {
      setLoading(false);
    }
  };

  const activeClass =
    color === "purple"
      ? "bg-purple-600 text-white border-purple-600"
      : "bg-blue-600 text-white border-blue-600";
  const inactiveClass =
    color === "purple"
      ? "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400"
      : "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400";

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-5 animate-[fadeUp_0.3s_ease-out_forwards]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Edit {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto py-1">
          {all.map((item) => (
            <button
              key={item.id}
              onClick={() => toggle(item)}
              className={`px-3 py-1 text-sm rounded-full border font-medium transition ${
                draft.some((i) => i.id === item.id)
                  ? activeClass
                  : inactiveClass
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-lg text-white font-semibold transition disabled:opacity-50 ${
              color === "purple"
                ? "bg-gradient-to-r from-purple-500 to-purple-700"
                : "bg-gradient-to-r from-blue-500 to-blue-700"
            }`}
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Profile ─────────────────────────────────────────────────────────────────

const Profile = () => {
  const { role } = useAuth();
  const { toasts, show: showToast, remove: removeToast } = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departement, setDepartement] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Store full objects so we can send {id, name} back to the backend
  const [categories, setCategories] = useState<TagItem[]>([]);
  const [skills, setSkills] = useState<TagItem[]>([]);
  const [allCategories, setAllCategories] = useState<TagItem[]>([]);
  const [allSkills, setAllSkills] = useState<TagItem[]>([]);

  const [modalOpen, setModalOpen] = useState<"skills" | "categories" | null>(
    null,
  );

  const [subbmitedTickets, setSubbmitedTickets] = useState(0);
  const [acceptedTickets, setAcceptedTickets] = useState(0);
  const [solvedTickets, setSolvedTickets] = useState(0);
  const [avgTime, setAvgTime] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (role === "USER") {
          const response = await getUserProfile();
          setUsername(response.data.username);
          setEmail(response.data.email);
          setLastLogin(response.data.lastLogin);
          setPhoneNumber(response.data.phoneNumber);
          setJobTitle(response.data.jobTitle);
          setDepartement(response.data.departement);

          const statsRes = await getUserStatistics();
          setSubbmitedTickets(statsRes.data.totalTicketsSubmitted);
          setAcceptedTickets(statsRes.data.totalAcceptedTickets);
        }
        if (role === "AGENT") {
          const response = await getAgentProfile();
          setUsername(response.data.username);
          setEmail(response.data.email);
          setLastLogin(response.data.lastLogin);
          setPhoneNumber(response.data.phoneNumber);
          setJobTitle(response.data.jobTitle);
          setDepartement(response.data.departement);
          // Keep full objects: [{id, name, ...}]
          setCategories(response.data.categories);
          setSkills(response.data.skills);

          const statsRes = await getAgentStatistics();
          setSolvedTickets(statsRes.data.totalSolvedTickets);
          setAvgTime(statsRes.data.averageResolutionTime);
          setRating(statsRes.data.rating);

          const [catsRes, skillsRes] = await Promise.all([
            getAllCategories(),
            getAllSkills(),
          ]);
          // Keep full objects for the modal options too
          setAllCategories(catsRes.data);
          setAllSkills(skillsRes.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserProfile();
  }, [role]);

  const patchProfile = async (
    overrides: Partial<{
      username: string;
      phoneNumber: string;
      departement: string;
      jobTitle: string;
    }>,
  ) => {
    const payload = {
      username,
      phoneNumber,
      departement,
      jobTitle,
      ...overrides,
    };
    if (role === "USER")
      await updateUserProfile(
        payload.username,
        payload.phoneNumber,
        payload.departement,
        payload.jobTitle,
      );
    if (role === "AGENT")
      await updateAgentProfile(
        payload.username,
        payload.phoneNumber,
        payload.departement,
        payload.jobTitle,
      );
  };

  return (
    <GlobalLayout>
      <div className="flex flex-col items-start px-10 gap-5 opacity-0 animate-[pageIn_0.6s_ease-out_forwards]">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.1s_forwards]">
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
              {"Last login: " + lastLogin}
            </h3>
          </div>

          <div className="flex flex-col p-5 w-[80%] items-start gap-3">
            <EditableUsername
              value={username}
              showToast={showToast}
              onSave={async (val) => {
                await patchProfile({ username: val });
                setUsername(val);
              }}
            />

            <div className="flex flex-col gap-2 text-sm text-gray-600 w-full">
              {/* Email is read-only */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-700 min-w-[90px]">
                  Email:
                </span>
                <span>{email}</span>
              </div>

              <EditableField
                label="Phone"
                value={phoneNumber}
                showToast={showToast}
                onSave={async (val) => {
                  await patchProfile({ phoneNumber: val });
                  setPhoneNumber(val);
                }}
              />
              <EditableField
                label="Department"
                value={departement}
                showToast={showToast}
                onSave={async (val) => {
                  await patchProfile({ departement: val });
                  setDepartement(val);
                }}
              />
              <EditableField
                label="Job title"
                value={jobTitle}
                showToast={showToast}
                onSave={async (val) => {
                  await patchProfile({ jobTitle: val });
                  setJobTitle(val);
                }}
              />
            </div>
          </div>

          <div className="flex justify-start p-5">
            <div
              className={`
                rounded-xl w-[90%] h-fit flex items-center justify-center
                px-4 py-2 text-sm font-semibold text-white shadow-sm
                ${role === "AGENT" && "bg-gradient-to-r from-blue-500 to-blue-700"}
                ${role === "USER" && "bg-gradient-to-r from-green-500 to-green-600"}
              `}
            >
              <span className="capitalize tracking-wide">{role}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {(role === "USER" || role === "AGENT") && (
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.3s_forwards]">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Statistics
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {role === "USER" && (
                <>
                  <StatCard
                    icon={FileText}
                    label="Submitted"
                    value={subbmitedTickets}
                    color="blue"
                  />
                  <StatCard
                    icon={CheckCircle}
                    label="Accepted"
                    value={acceptedTickets}
                    color="green"
                  />
                  <StatCard
                    icon={BarChart}
                    label="Acceptance Rate"
                    value={
                      subbmitedTickets > 0
                        ? ((acceptedTickets / subbmitedTickets) * 100).toFixed(
                            1,
                          ) + "%"
                        : "--%"
                    }
                    color="purple"
                  />
                </>
              )}
              {role === "AGENT" && (
                <>
                  <StatCard
                    icon={CheckCircle}
                    label="Solved"
                    value={solvedTickets}
                    color="green"
                  />
                  <StatCard
                    icon={Clock}
                    label="Avg Time"
                    value={avgTime}
                    color="blue"
                  />
                  <StatCard
                    icon={Star}
                    label="Rating"
                    value={rating}
                    color="purple"
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Expertise (Agent only) */}
        {role === "AGENT" && (
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6 opacity-0 animate-[fadeUp_0.5s_ease-out_0.4s_forwards]">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Expertise
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Tag size={18} className="text-purple-600" />
                    <span>Categories</span>
                  </div>
                  <button
                    onClick={() => setModalOpen("categories")}
                    className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium transition"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700 transition"
                    >
                      {cat.name}
                    </span>
                  ))}
                  {categories.length === 0 && (
                    <span className="text-sm italic text-gray-400">
                      None assigned
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Wrench size={18} className="text-blue-600" />
                    <span>Skills</span>
                  </div>
                  <button
                    onClick={() => setModalOpen("skills")}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 transition"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <span className="text-sm italic text-gray-400">
                      None assigned
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalOpen === "categories" && (
        <TagSelectModal
          title="Categories"
          all={allCategories}
          selected={categories}
          color="purple"
          onClose={() => setModalOpen(null)}
          showToast={showToast}
          onSave={async (selected) => {
            // Send full objects [{id, name, ...}] — matches Set<Category> on the backend
            await updateAgentCategories(selected);
            setCategories(selected);
          }}
        />
      )}
      {modalOpen === "skills" && (
        <TagSelectModal
          title="Skills"
          all={allSkills}
          selected={skills}
          color="blue"
          onClose={() => setModalOpen(null)}
          showToast={showToast}
          onSave={async (selected) => {
            // Send full objects [{id, name}] — matches Set<Skill> on the backend
            await updateAgentSkills(selected);
            setSkills(selected);
          }}
        />
      )}

      {/* Toast stack */}
      <Toast toasts={toasts} remove={removeToast} />

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

// ─── StatCard ────────────────────────────────────────────────────────────────

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
      <div
        className={`p-3 rounded-lg text-white bg-gradient-to-r ${colors[color]}`}
      >
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-lg font-bold text-gray-800">{value}</span>
      </div>
    </div>
  );
};
