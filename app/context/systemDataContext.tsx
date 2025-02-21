// TODO - change to SSR 
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of our system data
interface SystemData {
  roles: { id: number; name: string }[];
  specializations: { id: number; name: string }[];
}

// Create a context with default values
const SystemDataContext = createContext<SystemData | null>(null);

// Context provider component
export const SystemDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [systemData, setSystemData] = useState<SystemData | null>(null);


  const fetchSystemData = async () => {
    try {
      const [rolesData, specializationsData, ] = await Promise.all([
        fetch("/api/auth/role").then((res) => res.json()),
        fetch("/api/appointments/specialization").then((res) => res.json()),
      ]);

      setSystemData({
        roles: rolesData,
        specializations: specializationsData,
      });
    } catch (error) {
      console.error("Failed to fetch system data:", error);
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, []);

  return (
    <SystemDataContext.Provider value={systemData}>
      {children}
    </SystemDataContext.Provider>
  );
};

// Custom hook to use system data
export const useSystemData = () => {
   return useContext(SystemDataContext);
};
