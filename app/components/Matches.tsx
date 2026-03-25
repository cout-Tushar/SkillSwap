import React, { use } from 'react'
import { MyContext } from '../context/MyContext'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import {
    Menu,
    X,
    Home,
    Users,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut,
    Plus,
    Star,
    Clock,
    CheckCircle,
    AlertCircle,
    Search,
    Filter,
    Eye,
    Trash2,
    Edit,
    Bell,
    User,
} from 'lucide-react';

const Matches = () => {

    const { activeTab } = useContext(MyContext);

    interface Match {
        id: string;
        name: string;
        avatar: string;
        skill: string;
        rating: number;
        status: 'pending' | 'active' | 'completed';
    }

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
            {activeTab === 'matches' && (
                <div className="animate-fade-in space-y-6">
                    <h1 className="text-3xl font-bold">Skill Swaps</h1>
                    <div className="glass-effect rounded-3xl p-8 border-red-900/30">
                        <div className="space-y-4">
                            {matches.map((match) => (
                                <div
                                    key={match.id}
                                    className="flex items-center justify-between p-6 rounded-2xl border border-red-900/20 hover:border-red-900/50 hover:bg-white/5 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-white">
                                            {match.avatar}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {match.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{match.skill}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="flex items-center gap-1">
                                                <Star size={18} className="fill-yellow-500 text-yellow-500" />
                                                <span className="font-semibold">{match.rating}</span>
                                            </div>
                                            <span
                                                className={`text-sm px-3 py-1 rounded-full inline-block mt-2 ${match.status === 'active'
                                                    ? 'bg-green-900/30 text-green-400'
                                                    : 'bg-yellow-900/30 text-yellow-400'
                                                    }`}
                                            >
                                                {match.status === 'active'
                                                    ? '🟢 Active'
                                                    : '⏳ Pending'}
                                            </span>
                                        </div>
                                        <button className="btn-primary px-4 py-2 rounded-lg text-white font-semibold text-sm">
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Matches
