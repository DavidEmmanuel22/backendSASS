import React, { createContext, useContext, useState } from 'react';
import type { AppUser } from '../App';

interface UserContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; initialUser: AppUser | null }> = ({ children, initialUser }) => {
  const [user, setUser] = useState<AppUser | null>(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser debe usarse dentro de UserProvider');
  return ctx;
};
