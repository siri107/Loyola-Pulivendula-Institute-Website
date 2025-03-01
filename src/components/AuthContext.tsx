import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("username"));
  const navigation = useNavigate();

  // Sync user state with localStorage changes (for multi-tab support)
  useEffect(() => {
    const syncUser = () => {
      setUser(localStorage.getItem("username"));
    };

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, [user]);

  const login = (username: string) => {
    localStorage.setItem("username", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUser(null);
    navigation('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
