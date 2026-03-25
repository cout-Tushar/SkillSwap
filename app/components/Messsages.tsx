import React from 'react'
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

const Messsages = () => {
    const { activeTab } = useContext(MyContext);
    interface Message {
  id: string;
  from: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
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

  return (
    <div>
      {activeTab === 'messages' && (
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold">Messages</h1>
                <div className="glass-effect rounded-3xl p-8 border-red-900/30">
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition ${msg.unread
                            ? 'bg-red-900/20 border border-red-900/50 hover:bg-red-900/30'
                            : 'border border-red-900/20 hover:bg-white/5'
                          }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center font-bold text-white flex-shrink-0">
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
                        <button className="btn-primary px-4 py-2 rounded-lg text-white font-semibold text-sm">
                          Open
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
    </div>
  )
}

export default Messsages
