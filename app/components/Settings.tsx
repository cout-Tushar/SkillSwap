import React from 'react'
import { MyContext } from '../context/MyContext'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import {
  AlertCircle,
  Bell,
  User,
} from 'lucide-react';
import { text } from 'stream/consumers';


const Settings = ({email}:{email:string}) => {
  const { activeTab } = useContext(MyContext);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchBio = async () => {
      const req = await fetch("/api/updateBio?email=" + email);
      const data = await req.json();
      // Update the bio state with the fetched data
      setBio(data.bio);
    };
    fetchBio();
  }, [email]);


  const handleBioChange = async () => {
    // Handle bio change logic here
    const req = await fetch("/api/updateBio?email="+ email, {
      method: "POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({bio})
    })
    
  }



  return (
    <div>
          {activeTab === 'settings' && (
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <div className="glass-effect rounded-3xl p-8 border-red-900/30 space-y-8">
                  {/* Profile Section */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <User size={24} className="text-red-500" />
                      Profile Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email || ''}
                          disabled
                          className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-red-900/20 text-gray-400 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          value={bio}
                          onChange={(e)=>setBio(e.target.value)}
                          placeholder="Tell others about yourself..."
                          className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-red-900/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                          rows={4}
                        />
                      </div>
                      <button  onClick={handleBioChange} className="btn-primary px-6 py-3 rounded-lg text-white font-semibold" >
                        Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="border-t border-red-900/20 pt-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Bell size={24} className="text-red-500" />
                      Notifications
                    </h2>
                    <div className="space-y-3">
                      {[
                        'New messages',
                        'Skill swap requests',
                        'Profile recommendations',
                        'Weekly digest',
                      ].map((notification, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={index < 3}
                            className="w-4 h-4 rounded accent-red-600"
                          />
                          <span className="text-gray-300">{notification}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-red-900/20 pt-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-400">
                      <AlertCircle size={24} />
                      Danger Zone
                    </h2>
                    <button className="px-6 py-3 rounded-lg border border-red-600 text-red-400 hover:bg-red-600/10 transition font-semibold">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
      
    </div>
  )
}

export default Settings
