import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api, User, DemoUsage, SubscriptionStatus } from '../api/client';

interface AuthContextType {
  user: User | null;
  subscription: SubscriptionStatus | null;
  demoUsage: DemoUsage | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, accessKey: string) => Promise<void>;
  logout: () => void;
  refreshStatus: () => Promise<void>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [demoUsage, setDemoUsage] = useState<DemoUsage | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshStatus = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const data = await api.getMe();
      setUser(data.user);
      setSubscription(data.subscription);
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
      refreshStatus().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refreshStatus]);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setSubscription(data.subscription);
    setDemoUsage(data.demoUsage ?? null);
  };

  const register = async (name: string, email: string, password: string, accessKey: string) => {
    const data = await api.register(email, password, name, accessKey);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setSubscription(data.subscription);
    setDemoUsage(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSubscription(null);
    setDemoUsage(null);
  };

  const isDemo = user?.accountType === 'demo';

  return (
    <AuthContext.Provider
      value={{ user, subscription, demoUsage, loading, login, register, logout, refreshStatus, isDemo }}
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
