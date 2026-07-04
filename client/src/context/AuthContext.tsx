import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api, User, DemoUsage } from '../api/client';

interface AuthContextType {
  user: User | null;
  demoUsage: DemoUsage | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, accessKey: string) => Promise<void>;
  logout: () => void;
  refreshDemoUsage: () => Promise<void>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUsage, setDemoUsage] = useState<DemoUsage | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshDemoUsage = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const data = await api.getMe();
      setUser(data.user);
      setDemoUsage(data.demoUsage ?? null);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored && localStorage.getItem('token')) {
      setUser(JSON.parse(stored));
      refreshDemoUsage().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshDemoUsage]);

  const login = async (email: string, password: string) => {
    const { token, user: u, demoUsage: usage } = await api.login(email, password);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setDemoUsage(usage ?? null);
  };

  const register = async (name: string, email: string, password: string, accessKey: string) => {
    const { token, user: u } = await api.register(email, password, name, accessKey);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
    setDemoUsage(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDemoUsage(null);
  };

  const isDemo = user?.accountType === 'demo';

  return (
    <AuthContext.Provider
      value={{ user, demoUsage, loading, login, register, logout, refreshDemoUsage, isDemo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
