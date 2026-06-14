import { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import { Trash2, Plus, LayoutGrid, Zap } from "lucide-react";
import {
  createCategory,
  createSkill,
  getAllCategories,
  getAllSkills,
  deleteCategory as deleteCategoryApi,
  deleteSkill as deleteSkillApi,
} from "../../api/admin";

type Category = {
  id: number;
  name: string;
};

type Skill = {
  id: number;
  name: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [skills, setSkills] = useState<Skill[]>([]);

  const [newCategory, setNewCategory] = useState("");
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getAllSkills();
        setSkills(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  // CREATE CATEGORY
  const addCategory = async () => {
    if (!newCategory.trim()) return;

    setCategories((prev) => [...prev, { id: Date.now(), name: newCategory }]);
    await createCategory(newCategory);

    setNewCategory("");
  };

  // DELETE CATEGORY
  const deleteCategory = async (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    await deleteCategoryApi(id);
  };

  // CREATE SKILL
  const addSkill = async () => {
    if (!newSkill.trim()) return;

    setSkills((prev) => [...prev, { id: Date.now(), name: newSkill }]);
    await createSkill(newSkill);

    setNewSkill("");
  };

  // DELETE SKILL
  const deleteSkill = async (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    await deleteSkillApi(id);
  };

  return (
    <GlobalLayout>
      <div className="flex flex-col px-10 gap-8 opacity-0 animate-[pageIn_0.6s_ease-out_forwards]">
        {/* TITLE */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Categories & Skills
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CATEGORIES */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="text-blue-600" />
              <h2 className="text-xl font-semibold">Categories</h2>
            </div>

            {/* INPUT */}
            <div className="flex gap-2 mb-4">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addCategory}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span>{cat.name}</span>

                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-purple-600" />
              <h2 className="text-xl font-semibold">Skills</h2>
            </div>

            {/* INPUT */}
            <div className="flex gap-2 mb-4">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="New skill"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={addSkill}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span>{skill.name}</span>

                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

export default Categories;
