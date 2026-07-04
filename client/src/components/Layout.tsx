import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      <div className="bg-orb w-96 h-96 bg-indigo-600/20 -top-48 -left-48 animate-float" />
      <div className="bg-orb w-80 h-80 bg-purple-600/15 top-1/3 -right-40 animate-float" style={{ animationDelay: '2s' }} />
      <div className="bg-orb w-72 h-72 bg-blue-600/10 bottom-0 left-1/3 animate-float" style={{ animationDelay: '4s' }} />

      <header className="relative z-10 border-b border-white/[0.08] backdrop-blur-xl bg-black/20 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-white truncate">AI Report Generator</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Professional business insights</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {location.pathname !== '/' && (
                <Link to="/" className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <button onClick={logout} className="btn-secondary text-sm py-2 px-3 sm:px-4">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
