"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Session {
  userId: string;
  userName: string;
  videoLinks: string[] | null;
  lastPlayed: string | null;
}

interface SessionContext {
  sessionInfo: Session | null;
  setSessionInfo: (sessionInfo: Session | null) => void;
}

const SessionContext = createContext<SessionContext | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionInfo, setSessionInfo] = useState<Session | null>(null);

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
