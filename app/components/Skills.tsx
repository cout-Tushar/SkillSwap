import React, { use } from 'react'
import { MyContext } from '../context/MyContext'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import AddSkillPopop from './AddSKillPopop';
import {
  Users,
  BookOpen,
  Plus,
  Star,
  Trash2,
  Edit,
} from 'lucide-react';




const Skills = ({ email }: { email: string }) => {

  const [skills, setSkills] = useState<Skill[]>([]);

useEffect(() => {

  const fetchSkills = async () => {
    const req = await fetch("/api/skills?email=" + email);
    const data = await req.json();

    const { skillsOffered, skillsNeeded } = data;

    const formattedSkills: Skill[] = [
      ...skillsOffered.map((s: any) => ({
        
        skillId:s.skillId,
        name: s.skill,
        level: s.level,
        type: "teaching"
      })),
      ...skillsNeeded.map((s: any) => ({
        skillId: s.skillId,
        name: s.skill,
        level: s.level,
        type: "learning"
      }))
     
    ];
    setSkills(formattedSkills);
    
  };

  fetchSkills();

}, [email]);


  const addSkillToList = (skill: Skill) => {
    setSkills(prev => [...prev, skill]);
    setShowForm(false);
  };
  const [showform, setShowForm] = useState(false);
  const handleAddSkill = () => {
    setShowForm(true);
  }
  const { activeTab } = useContext(MyContext);
  const handleDeleteSkill = async (id: string,type:string) => {

    const req= await fetch("/api/skills?email="+email, {
      method:"DELETE",
      headers: {"Content-Type":"application/json"
      },
      body: JSON.stringify({
        skillId:id,type: type
      })
    });
    setSkills(skills.filter(skill => skill.skillId !== id));
  }
  interface Skill {
    skillId: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    type: 'teaching' | 'learning';
  }
  return (
    <div>
      {showform && (
        <AddSkillPopop
          onClose={() => setShowForm(false)}
          onAdd={addSkillToList}
          email={email}
        />
      )}
      {activeTab === 'skills' && (
        <div className="animate-fade-in space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Skills</h1>
            <button className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg shadow-red-900/30" onClick={handleAddSkill}>
              <Plus size={20} />
              Add Skill
            </button>
          </div>

          {/* Teaching Skills */}
          <div className="glass-effect rounded-3xl p-8 border-red-900/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-red-500" />
              Skills I'm Teaching
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills
                .filter(s => s.type === 'teaching')
                .map((skill) => (
                  <div
                    key={skill.skillId}
                    className="glass-effect rounded-2xl p-6 border-red-900/20 group hover:border-red-900/50 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                         <span className="skill-tag mt-2">{skill.level}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition text-sm">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.skillId,skill.type)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Learning Skills */}
          <div className="glass-effect rounded-3xl p-8 border-red-900/30">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users size={24} className="text-red-500" />
              Skills I Want to Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills
                .filter(s => s.type === 'learning')
                .map((skill) => (
                  <div
                    key={skill.skillId}
                    className="glass-effect rounded-2xl p-6 border-red-900/20 group hover:border-red-900/50 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                        <span className="skill-tag mt-2">{skill.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition text-sm">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.skillId,skill.type)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
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

export default Skills
