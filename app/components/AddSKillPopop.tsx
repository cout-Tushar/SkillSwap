import { useState } from "react";

interface Skill {
  skillId: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "teaching" | "learning";
}

interface Props {
  onClose: () => void;
  onAdd: (skill: Skill) => void;
  email: string;
}

export default function AddSkillPopup({ onClose, onAdd,email }: Props) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Skill["level"]>("Beginner");
  const [type, setType] = useState<Skill["type"]>("teaching");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSkill: Skill = {
      skillId: crypto.randomUUID(),
      name,
      level,
      type,
    };

    onAdd(newSkill);
    const  req= await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newSkill, email }),
    });
    if(req.ok){
      console.log("Skill added successfully");
    } else {
      console.error("Failed to add skill");
    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl space-y-4 w-96 shadow-xl border border-gray-700"
      >
        <h2 className="text-xl font-bold text-white">Add Skill</h2>

        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={level}
          onChange={(e) => setLevel(e.target.value as Skill["level"])}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={type}
          onChange={(e) => setType(e.target.value as Skill["type"])}
        >
          <option value="teaching">Teaching</option>
          <option value="learning">Learning</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 rounded text-white"
          >
            Add
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}