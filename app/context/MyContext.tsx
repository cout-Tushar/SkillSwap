"use client";

import { createContext, useState } from "react";

export const MyContext = createContext<any>(null);

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <MyContext.Provider value={{ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }}>
      {children}
    </MyContext.Provider>
  );
};