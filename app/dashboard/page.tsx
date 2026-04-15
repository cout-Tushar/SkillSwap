"use client"
import { useSession } from "next-auth/react";

import SignedIN_header from "../components/SignedIN_header";
import Sidebar from "../components/Sidebar";
import { MyContext} from "../context/MyContext";
import { useContext } from "react";
import Overview from '../components/Overview';
import Skills from '../components/Skills';
import Matches from '../components/Matches';
import Messsages from '../components/Messsages';
import Settings from '../components/Settings';
const DashboardPage = () => {

  

  const { data: session } = useSession();
  const username: string = session?.user?.email?.split('@')[0] || 'User';
  const email: string = session?.user?.email|| '';
  const {sidebarOpen} = useContext(MyContext);
  if (!session) {
    return null;
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <SignedIN_header />
      <div className="flex relative">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml' : ''
            }`}>
          <div className="p-6 md:p-8 max-w-7xl mt-10">
            <Overview email={email} />
            <Skills email={email} />
            <Matches />
            <Messsages />
            <Settings email={email} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;