import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo users for different roles
const defaultUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@student.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@teacher.com',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Carlos Admin',
    email: 'admin@portal.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100&h=100&fit=crop',
    createdAt: new Date()
  }
];

// Default passwords for demo accounts
const defaultPasswords: Record<string, string> = {
  'joao@student.com': '123456',
  'maria@teacher.com': '123456',
  'admin@portal.com': '123456'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize users and passwords from localStorage or use defaults
  const getStoredUsers = (): User[] => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : defaultUsers;
  };

  const getStoredPasswords = (): Record<string, string> => {
    const stored = localStorage.getItem('passwords');
    return stored ? JSON.parse(stored) : defaultPasswords;
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const savePasswords = (passwords: Record<string, string>) => {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  };

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    const passwords = getStoredPasswords();
    
    const foundUser = users.find(u => u.email === email);
    const storedPassword = passwords[email];
    
    if (foundUser && storedPassword === password) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      // Redirect will be handled by the component that calls login
    } else {
      throw new Error('Credenciais inválidas');
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher' = 'student') => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getStoredUsers();
    const passwords = getStoredPasswords();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      setLoading(false);
      throw new Error('Este email já está em uso');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?w=100&h=100&fit=crop`,
      createdAt: new Date()
    };
    
    // Save user and password
    const updatedUsers = [...users, newUser];
    const updatedPasswords = { ...passwords, [email]: password };
    
    saveUsers(updatedUsers);
    savePasswords(updatedPasswords);
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};