
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
} from 'lucide-react';
const Sidebar = () => {


const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen } = useContext(MyContext);

  return (
    <div>
      <aside
        className={`fixed left-0 top-20 h-[calc(100vh-80px)] bg-gray-950 border-r border-red-900/30 transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden`}
      >
        <nav className="p-6 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: Home },
            { id: 'skills', label: 'My Skills', icon: BookOpen },
            { id: 'matches', label: 'Skill Swaps', icon: Users },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-item w-full flex items-center gap-3 px-6 py-3 rounded-lg text-left text-gray-300 hover:text-white ${activeTab === item.id ? 'active' : ''
                  }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}


        </nav>
      </aside>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-24 z-50 md:hidden p-2 rounded-lg bg-red-600 hover:bg-red-500 text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''
          }`}
      ></main>

    </div>
  )
}

export default Sidebar
