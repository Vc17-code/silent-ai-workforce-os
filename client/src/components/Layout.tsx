import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MicroNav from './MicroNav';
import SubscriptionBadge from './SubscriptionBadge';

export default function Layout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen min-h-[100dvh] relative">
      <div className="bg-orb w-72 h-72 bg-indigo-600/15 -top-32 -left-32 animate-float" />
      <div className="bg-orb w-64 h-64 bg-purple-600/10 bottom-24 -right-32 animate-float" style={{ animationDelay: '3s' }} />

      <header className="relative z-10 border-b border-white/[0.08] backdrop-blur-xl bg-black/20 pt-[env(safe-area-inset-top)]">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">ReportAI</span>
          </div>
          <div className="flex items-center gap-2">
            <SubscriptionBadge />
            <span className="text-xs text-slate-400 hidden sm:inline truncate max-w-[100px]">
              {user?.name?.split(' ')[0]}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-lg mx-auto px-4 py-5 pb-24">
        <Outlet />
      </main>

      <MicroNav />
    </div>
  );
}
