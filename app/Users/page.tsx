"use client"
import SignedIN_header from "@/app/components/SignedIN_header";
import { useEffect, useState } from "react";
import Link  from "next/link";

const UsersPage = () => {

  // Skill type
interface Skill {
  skillId: string;
  skill: string;
  level: "beginner" | "intermediate" | "advanced";
}

// User type
interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  skillsOffered: Skill[];
  skillsNeeded: Skill[];
}

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

  if (loading) {
     <SignedIN_header/>
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  if (!users.length) {
    <SignedIN_header/>
    return <div className="p-6 text-gray-400">No users found</div>;
  }

  return (
   <>
     <SignedIN_header/>

    <div className="p-6 space-y-6 animate-fade-in">
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

        {users.map((user: User) => (
          <div
            key={user._id}
            className="glass-effect rounded-2xl p-6 border-red-900/20 hover:border-red-900/50 hover:scale-[1.02] transition group"
          >

            {/* Name */}
            <h3 className="text-lg font-semibold text-white mb-3">
              {user.name}
            </h3>

            {/* Skills Offered */}
            <div className="mb-3">
              <p className="text-sm text-gray-400">Offers</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsOffered?.slice(0, 2).map((s: Skill) => (
                  <span key={s.skillId} className="skill-tag">
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="mb-4">
              <p className="text-sm text-gray-400">Wants</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsNeeded?.slice(0, 2).map((s: Skill) => (
                  <span key={s.skillId} className="skill-tag">
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="opacity-0 group-hover:opacity-100 transition">
              <Link
                href={`/user/${user._id}`}
                className="block text-center px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm"
              >
                View Profile
              </Link>
            </div>

          </div>
        ))}

      </div>
    </div>
    </>
  );
};

export default UsersPage;