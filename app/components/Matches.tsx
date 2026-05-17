import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/MyContext';
import { Star } from 'lucide-react';

const Matches = ({ email }: { email: string }) => {
  const { activeTab } = useContext(MyContext);

  interface Match {
    id: string;
    name: string;
    avatar: string;
    skill: string[];
    rating: number;
    status: 'pending' | 'active' | 'completed';
  }

  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!email) return;

        const res = await fetch(`/api/swap/display?email=${email}`);
        const data = await res.json();

        console.log("API Response:", data);

        // ✅ prevent crash
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          setMatches([]);
        }

      } catch (err) {
        console.error("Error fetching matches:", err);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [email]);

  return (
    <div>
      {activeTab === 'matches' && (
        <div className="animate-fade-in space-y-6">
          <h1 className="text-3xl font-bold">Skill Swaps</h1>

          <div className="glass-effect rounded-3xl p-8 border-red-900/30">
            <div className="space-y-4">

              {/* ✅ Safe rendering */}
              {Array.isArray(matches) && matches.length > 0 ? (
                matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-6 rounded-2xl border border-red-900/20 hover:border-red-900/50 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center gap-4">

                      {/* Avatar initials */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-white">
                        {match.name
                          ?.split(" ")
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {match.name}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          {match.skill?.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star size={18} className="fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{match.rating}</span>
                        </div>

                        <span
                          className={`text-sm px-3 py-1 rounded-full inline-block mt-2 ${
                            match.status === 'active'
                              ? 'bg-green-900/30 text-green-400'
                              : match.status === 'pending'
                              ? 'bg-yellow-900/30 text-yellow-400'
                              : 'bg-gray-700/30 text-gray-400'
                          }`}
                        >
                          {match.status === 'active'
                            ? '🟢 Active'
                            : match.status === 'pending'
                            ? '⏳ Pending'
                            : '✅ Completed'}
                        </span>
                      </div>

                      <button className="btn-primary px-4 py-2 rounded-lg text-white font-semibold text-sm">
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No swap requests yet
                </p>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;