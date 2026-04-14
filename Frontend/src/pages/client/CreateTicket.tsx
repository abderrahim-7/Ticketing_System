import GlobalLayout from "../../layout/GlobalLayout";

const CreateTicket = () => {
  const categories = [
    "Technical Issue",
    "Bug Report",
    "Account Problem",
    "Billing & Payment",
    "Feature Request",
    "General Inquiry",
    "Access / Permission Issue",
    "Performance Issue",
    "Security Concern",
  ];

  return (
    <GlobalLayout>
      <div className="flex flex-col items-start px-10">
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
            <select className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
              <option>Select a category</option>
              {categories.map((cat, index) => (
                <option key={index}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe your issue..."
              rows={4}
              className="p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* BUTTON */}
          <button className="mt-4 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Submit Ticket
          </button>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default CreateTicket;
