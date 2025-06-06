"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SessionType {
  userId: string;
  userName: string;
  videoLinks: string[];
  lastPlayed: string;
}

interface SessionContext {
  sessionInfo: SessionType;
  setSessionInfo: (sessionInfo: SessionType) => void;
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionInfo, setSessionInfo] = useState<SessionType>({
    userId: "",
    userName: "",
    videoLinks: [],
    lastPlayed: "",
  });

  return (
    <SessionContext.Provider value={{ sessionInfo, setSessionInfo }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
