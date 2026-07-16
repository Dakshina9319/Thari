import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'weaver' | 'buyer' | 'society' | null;

interface UserContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('thari_user_role');
      return (saved as UserRole) || null;
    } catch {
      return null;
    }
  });

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    try {
      if (role) {
        localStorage.setItem('thari_user_role', role);
      } else {
        localStorage.removeItem('thari_user_role');
      }
    } catch (e) {
      console.warn('Failed to save user role to localStorage:', e);
    }
  };

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
