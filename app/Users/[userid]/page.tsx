"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SignedIN_header from "@/app/components/SignedIN_header";
import { BookOpen, Users, Star, Mail, Award } from "lucide-react";
import SwapRequestModal from "@/app/components/SwapRequestModal";

// ✅ Types
interface Skill {
  skillId: string;
  skill: string;
  level: "beginner" | "intermediate" | "advanced";
}

interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  rating: number;
  skillsOffered: Skill[];
  skillsNeeded: Skill[];
}

const UserProfilePage = () => {
  const params = useParams();
  const userid = params.userid as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [Swap_exists, setSwapExists] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userid}`);
      const data: User = await res.json();
      const swapRes = await fetch(`/api/swap/check?receiverId=${userid}`);
      const swapData = await swapRes.json();
      setSwapExists(swapData.exists);

      setUser(data);
      console.log(data)
      setLoading(false);
    };

    if (userid) fetchUser();
  }, [userid,open]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "intermediate":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "advanced":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <>
      <SignedIN_header />

      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pt-24 pb-12">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                <div className="text-gray-400 text-lg font-medium">Loading profile...</div>
              </div>
            </div>
          )}

          {/* User Info */}
          {user && (
            <>
              {/* Hero Section */}
              <div className="glass-effect rounded-3xl p-8 sm:p-12 border border-red-900/30 shadow-2xl shadow-red-900/20 backdrop-blur-xl bg-gradient-to-br from-red-950/20 to-black/40 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Name with decorative line */}
                      <div className="space-y-2">
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                          {user.name}
                        </h1>
                        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                        {user.bio || "No bio provided"}
                      </p>

                      {/* Email */}
                      <div className="flex items-center gap-3 text-gray-400">
                        <Mail size={18} />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="flex flex-col gap-4">
                      {/* Rating */}
                      <div className="glass-effect px-8 py-6 rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-950/30 to-black/50 shadow-xl min-w-[200px]">
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <Star size={28} className="text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                          <span className="text-5xl font-black text-white">
                            {user.rating?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                        <p className="text-center text-gray-400 text-sm font-medium">User Rating</p>
                      </div>

                      {/* Skills Count */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="glass-effect px-4 py-3 rounded-xl border border-red-900/30 text-center">
                          <div className="text-2xl font-bold text-red-400">{user.skillsOffered?.length || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Offered</div>
                        </div>
                        <div className="glass-effect px-4 py-3 rounded-xl border border-red-900/30 text-center">
                          <div className="text-2xl font-bold text-red-400">{user.skillsNeeded?.length || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Wanted</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid lg:grid-cols-2 gap-8">

                {/* Skills Offered */}
                <div className="glass-effect rounded-3xl p-8 border border-red-900/30 shadow-2xl shadow-red-900/10 backdrop-blur-xl bg-gradient-to-br from-red-950/10 to-black/30 h-fit">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-red-900/30">
                    <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/20">
                      <BookOpen size={28} className="text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Skills Offered</h2>
                      <p className="text-gray-400 text-sm mt-1">What I can teach you</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {user.skillsOffered?.length ? (
                      user.skillsOffered.map((s, index) => (
                        <div
                          key={s.skillId}
                          className="glass-effect p-5 rounded-2xl border border-red-900/20 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-1 group bg-gradient-to-r from-red-950/5 to-transparent"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                <Award size={20} className="text-red-400" />
                              </div>
                              <h3 className="text-white font-bold text-lg group-hover:text-red-300 transition-colors">
                                {s.skill}
                              </h3>
                            </div>
                            <span className={`skill-tag px-4 py-2 rounded-xl text-sm font-semibold border ${getLevelColor(s.level)} whitespace-nowrap`}>
                              {s.level}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <BookOpen size={48} className="text-gray-600 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400">No skills offered yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills Needed */}
                <div className="glass-effect rounded-3xl p-8 border border-red-900/30 shadow-2xl shadow-red-900/10 backdrop-blur-xl bg-gradient-to-br from-red-950/10 to-black/30 h-fit">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-red-900/30">
                    <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/20">
                      <Users size={28} className="text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Skills Wanted</h2>
                      <p className="text-gray-400 text-sm mt-1">What I want to learn</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {user.skillsNeeded?.length ? (
                      user.skillsNeeded.map((s, index) => (
                        <div
                          key={s.skillId}
                          className="glass-effect p-5 rounded-2xl border border-red-900/20 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-1 group bg-gradient-to-r from-red-950/5 to-transparent"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                <Award size={20} className="text-red-400" />
                              </div>
                              <h3 className="text-white font-bold text-lg group-hover:text-red-300 transition-colors">
                                {s.skill}
                              </h3>
                            </div>
                            <span className={`skill-tag px-4 py-2 rounded-xl text-sm font-semibold border ${getLevelColor(s.level)} whitespace-nowrap`}>
                              {s.level}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16">
                        <Users size={48} className="text-gray-600 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400">No skills requested yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-6">
                {Swap_exists ? (
                  <button
                    disabled
                    className="px-12 py-5 rounded-2xl text-gray-300 font-bold text-xl 
    bg-gradient-to-r from-gray-800 via-gray-900 to-black 
    border border-gray-700 
    shadow-inner 
    cursor-not-allowed opacity-80"
                  >
                    Swap Requested
                  </button>
                ) : (
                  <button
                    onClick={() => setOpen(true)}
                    className="group relative px-12 py-5 rounded-2xl text-white font-bold text-xl shadow-2xl shadow-red-900/50 hover:shadow-red-500/50 transition-all duration-300 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 border border-red-500/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative flex items-center gap-3">
                      <Users size={24} />
                      Request Swap
                    </span>
                  </button>
                )}
                <SwapRequestModal receiverId={user._id} isOpen={open} onClose={() => setOpen(false)} userid={user._id} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;