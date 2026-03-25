
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BookOpen, Users, CheckCircle, MessageSquare, Bell, Star } from "lucide-react";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";


const Overview = ({ email }: { email: string }) => {
  const {activeTab} = useContext(MyContext);
const [Skill, setSkill] = useState<[number, number]>([0, 0]);
const username = email.split("@")[0];

useEffect(() => {
  const fetchSkills = async () => {
    try {
      const req = await fetch("/api/overview?email=" + email);
      const data = await req.json();
      setSkill([data.skillsTeaching, data.skillsLearning]);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  fetchSkills();
}, [email]);


interface Message {
  id: string;
  from: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
}

interface Match {
  id: string;
  name: string;
  avatar: string;
  skill: string;
  rating: number;
  status: 'pending' | 'active' | 'completed';
}

  const [messages] = useState<Message[]>([
      {
        id: '1',
        from: 'Sarah Chen',
        avatar: 'SC',
        preview: 'Hey! I would love to learn Python from you...',
        time: '2 hours ago',
        unread: true,
      },
      {
        id: '2',
        from: 'Marcus Rodriguez',
        avatar: 'MR',
        preview: 'Thanks for the design tips! Really helpful...',
        time: '5 hours ago',
        unread: false,
      },
    ]);

      const [matches] = useState<Match[]>([
        {
          id: '1',
          name: 'Sarah Chen',
          avatar: 'SC',
          skill: 'Python for Design Portfolio',
          rating: 4.8,
          status: 'active',
        },
        {
          id: '2',
          name: 'Marcus Rodriguez',
          avatar: 'MR',
          skill: 'Learning UI Design',
          rating: 4.5,
          status: 'pending',
        },
      ]);
    
  

  return (
    <div>
        {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in space-y-8">
                {/* Welcome Section */}
                <div className="glass-effect rounded-3xl p-8 border-red-900/30">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome back, {username}! 👋
                  </h1>
                  <p className="text-gray-400">
                    Here's what's happening on your SkillSwap account today
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      label: 'Skills Teaching',
                      value: Skill[0],
                      icon: BookOpen,
                      color: 'from-red-600 to-red-500',
                    },
                    {
                      label: 'Skills Learning',
                      value: Skill[1],
                      icon: Users,
                      color: 'from-orange-600 to-orange-500',
                    },
                    {
                      label: 'Active Swaps',
                      value: matches.filter(m => m.status === 'active').length,
                      icon: CheckCircle,
                      color: 'from-green-600 to-green-500',
                    },
                    {
                      label: 'Unread Messages',
                      value: messages.filter(m => m.unread).length,
                      icon: MessageSquare,
                      color: 'from-blue-600 to-blue-500',
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className={`stat-card glass-effect rounded-2xl p-6 bg-gradient-to-br ${stat.color} bg-opacity-10 border-red-900/20`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-gray-400 text-sm font-medium">
                              {stat.label}
                            </p>
                            <p className="text-4xl font-bold mt-2">{stat.value}</p>
                          </div>
                          <Icon size={32} className="text-red-500/50" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Latest Messages */}
                  <div className="glass-effect rounded-3xl p-6 border-red-900/30">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <MessageSquare size={24} className="text-red-500" />
                        Latest Messages
                      </h2>
                      <Bell size={20} className="text-gray-500" />
                    </div>
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="flex items-start gap-4 pb-4 border-b border-red-900/20 hover:bg-white/5 p-3 rounded-lg transition cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {msg.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-white">{msg.from}</p>
                              {msg.unread && (
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                              )}
                            </div>
                            <p className="text-gray-400 text-sm truncate">
                              {msg.preview}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Swaps */}
                  <div className="glass-effect rounded-3xl p-6 border-red-900/30">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                      <Users size={24} className="text-red-500" />
                      Active Swaps
                    </h2>
                    <div className="space-y-4">
                      {matches.map((match) => (
                        <div
                          key={match.id}
                          className="flex items-start gap-4 pb-4 border-b border-red-900/20 hover:bg-white/5 p-3 rounded-lg transition"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {match.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white">{match.name}</p>
                            <p className="text-gray-400 text-sm">{match.skill}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1">
                                <Star size={14} className="fill-yellow-500 text-yellow-500" />
                                <span className="text-xs text-gray-400">
                                  {match.rating}
                                </span>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  match.status === 'active'
                                    ? 'bg-green-900/30 text-green-400'
                                    : 'bg-yellow-900/30 text-yellow-400'
                                }`}
                              >
                                {match.status === 'active'
                                  ? 'Active'
                                  : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
  )
}

export default Overview
