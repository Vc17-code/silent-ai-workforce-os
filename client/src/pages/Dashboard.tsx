import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, ReportSummary } from '../api/client';
import { useAuth } from '../context/AuthContext';
import ReportCard from '../components/ReportCard';
import DemoBanner from '../components/DemoBanner';

export default function Dashboard() {
  const { user, isDemo, subscription } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    try {
      setReports(await api.getReports());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDelete = async (id: number) => {
    try {
      await api.deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Hi, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-slate-400 mt-1">
          {isDemo ? 'Explore the premium showcase below' : 'Your AI-powered report studio'}
        </p>
      </div>

      <DemoBanner />

      <div className="grid grid-cols-2 gap-3">
        <Link to="/upload" className="glass-card p-4 flex flex-col gap-2 hover:bg-white/[0.08] transition-colors">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white">New report</span>
          <span className="text-xs text-slate-500">
            {subscription?.reportsRemaining ?? '∞'} left
          </span>
        </Link>
        <Link to="/plans" className="glass-card p-4 flex flex-col gap-2 hover:bg-white/[0.08] transition-colors">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Upgrade</span>
          <span className="text-xs text-slate-500">{subscription?.planName ?? 'View plans'}</span>
        </Link>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-white mb-3">
          {isDemo ? 'Showcase & Reports' : 'Recent Reports'}
        </h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-7 h-7 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card text-center py-10">
            <p className="text-slate-400 text-sm mb-3">No reports yet</p>
            <button onClick={() => navigate('/upload')} className="btn-primary text-sm py-2 px-4">
              Upload data
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onDelete={isDemo && report.is_showcase ? undefined : handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
