"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* 🔥 Tag Selector Component */
function TagSelector({ options = [], selected, setSelected, label }) {
  const toggleSkill = (skill) => {
    if (selected.includes(skill)) {
      setSelected(selected.filter((s) => s !== skill));
    } else {
      setSelected([...selected, skill]);
    }
  };

  return (
    <div>
      <p className="text-gray-300 text-sm mb-2">{label}</p>

      <div className="flex flex-wrap gap-2">
        {options.map((skill, i) => {
          const isActive = selected.includes(skill);

          return (
            <button
              key={i}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full text-sm border transition-all
                ${
                  isActive
                    ? "bg-red-600 border-red-500 text-white"
                    : "bg-black/40 border-gray-600 text-gray-300 hover:border-red-400"
                }`}
            >
              {skill}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SwapRequestModal({ receiverId, isOpen, onClose, userid }) {
  const [offer, setOffer] = useState([]);
  const [want, setWant] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills_Offered, setSkillsOffered] = useState([]);
  const [skills_Wanted, setSkillsWanted] = useState([]);




  /* 🔥 Fetch skills */
  useEffect(() => {
    const Userskillgetter = async () => {
      try {
        const res = await fetch(`/api/users/${userid}/skills`);
        const data = await res.json();

        setSkillsOffered(
          (data.skillsOffered || []).map((item) => item.skill)
        );
      } catch (err) {
        console.error(err);
      }
    };

    const Selfskillgetter = async () => {
      try {
        const res = await fetch(`/api/users/userData/skills`);
        const data = await res.json();

        setSkillsWanted(
          (data.skillsOffered || []).map((item) => item.skill)
        );
      } catch (err) {
        console.error(err);
      }
    };

    Userskillgetter();
    Selfskillgetter();
    console.log("Fetching skills for user:", userid);
  }, [userid]);

  /* ✅ Correct logging */
  useEffect(() => {
    console.log("My Skills (offer):", skills_Wanted);
    console.log("Receiver Skills (want):", skills_Offered);
  }, [skills_Wanted, skills_Offered]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/swap/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: receiverId,
          skillOffered: offer,
          skillWanted: want,
          status: "pending",
          message,
        }),
      });

      if (res.ok) {
        onClose();
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-[400px] max-w-[90%] rounded-3xl p-8 border border-red-900/40 bg-gradient-to-br from-red-950/40 to-black/70 shadow-2xl shadow-red-900/40 animate-fade-in">

        <h2 className="text-2xl font-bold text-white mb-6">
          Request Skill Swap
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ✅ YOUR skills (offer) */}
          <TagSelector
            options={skills_Wanted}
            selected={offer}
            setSelected={setOffer}
            label="Select skills you offer"
          />

          {/* ✅ RECEIVER skills (want) */}
          <TagSelector
            options={skills_Offered}
            selected={want}
            setSelected={setWant}
            label="Select skills you want"
          />

          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-red-900/30 text-white focus:outline-none focus:border-red-500"
          />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || offer.length === 0 || want.length === 0}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}