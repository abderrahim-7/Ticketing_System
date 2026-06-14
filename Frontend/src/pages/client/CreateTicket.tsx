import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import { creatTicket, getAllCategories } from "../../api/user";
import Toast from "../../components/ui/Toast";

const CreateTicket = () => {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [msgType, setMessageTyp] = useState<"error" | "success">("error");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreation = async () => {
    try {
      await creatTicket(title, description, selectedCategory);
      setMessage("Ticket created successfuly");
      setMessageTyp("success");
      setTitle("");
      setSelectedCategory(0);
      setDescription("");
    } catch (err) {
      setMessage("An issue has happened");
      setMessageTyp("error");
      console.error("Error creating ticket:", err);
    }
  };

  return (
    <GlobalLayout>
      {message && (
        <Toast
          type={msgType}
          message={message}
          onClose={function (): void {
            setMessage("");
          }}
        />
      )}
      <div
        className={`
          flex flex-col items-start px-10
          transition-all duration-500 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-5">
          Create Ticket
        </h1>

        {/* FORM CONTAINER */}
        <div className="w-[100%] bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          {/* Ticket Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Ticket Name
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter ticket name..."
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value={0}>Select a category</option>

              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue..."
              rows={4}
              className="p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleCreation}
            className="mt-4 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default CreateTicket;
