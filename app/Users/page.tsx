"use client";
import SignedIN_header from "@/app/components/SignedIN_header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, ArrowRight } from "lucide-react";

// Types
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
  skillsOffered: Skill[];
  skillsNeeded: Skill[];
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users/userData");
      const data: User[] = await res.json();

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <SignedIN_header />

      <div className="min-h-screen p-6 sm:p-8 pt-24 pb-12 mt-10">
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">

          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
              Explore Users
            </h1>
            <p className="text-gray-400">
              Find people to exchange skills with
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-transparent mx-auto rounded-full"></div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-32">
              <div className="w-14 h-14 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Empty */}
          {!loading && users.length === 0 && (
            <div className="text-center py-32 text-gray-400">
              No users found
            </div>
          )}

          {/* Users Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user._id}
                className="relative group rounded-3xl p-6 border border-red-900/30 
                bg-gradient-to-br from-red-950/20 to-black/40 backdrop-blur-xl 
                shadow-xl hover:shadow-red-900/40 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition"></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-300 transition">
                    {user.name}
                  </h3>

                  {/* Bio */}
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {user.bio || "No bio provided"}
                  </p>

                  {/* Skills Offered */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                      <BookOpen size={16} className="text-red-400" />
                      Offers
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsOffered?.slice(0, 3).map((s) => (
                        <span
                          key={s.skillId}
                          className="px-3 py-1 text-xs rounded-lg border border-red-500/20 bg-red-500/10 text-red-300"
                        >
                          {s.skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                      <Users size={16} className="text-red-400" />
                      Wants
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.skillsNeeded?.slice(0, 3).map((s) => (
                        <span
                          key={s.skillId}
                          className="px-3 py-1 text-xs rounded-lg border border-red-500/20 bg-red-500/10 text-red-300"
                        >
                          {s.skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/Users/${user._id}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl 
                    bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 
                    text-white font-semibold shadow-lg shadow-red-900/40 transition"
                  >
                    View Profile
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersPage;