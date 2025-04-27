
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Check for existing session on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedAdmin = localStorage.getItem('isAdmin');
    
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, hardcode admin credentials
    // In a real app, this would validate against a database
    if (email === 'admin@example.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      
      toast({
        title: "Login successful",
        description: "Welcome back, Admin!"
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
