import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, ReportDetail } from '../api/client';
import ChartSection from '../components/ChartSection';

function InsightList({ title, items, icon, color }: { title: string; items: string[]; icon: React.ReactNode; color: string }) {
  return (
    <div className="glass-card">
      <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${color}`}>
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0 opacity-60" style={{ color: 'inherit' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Report() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api
      .getReport(Number(id))
      .then(setReport)
      .catch(() => setError('Report not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async (format: 'pdf' | 'docx' | 'html') => {
    if (!report) return;
    setDownloading(format);
    try {
      await api.downloadReport(report.id, format);
    } catch {
      setError('Download failed');
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="glass-card text-center py-16">
        <p className="text-red-300 mb-4">{error || 'Report not found'}</p>
        <Link to="/" className="btn-primary inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { analysis } = report;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors mb-2 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{report.title}</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 break-words">
            {report.filename} · {report.rowCount} rows · {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
          {(['pdf', 'docx', 'html'] as const).map((format) => (
            <button
              key={format}
              onClick={() => handleDownload(format)}
              disabled={downloading !== null}
              className="btn-secondary text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 py-2.5"
            >
              {downloading === format ? (
                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              {format === 'docx' ? 'Word' : format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <section className="glass-card animate-slide-up">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Executive Summary
        </h2>
        <p className="text-slate-300 leading-relaxed">{analysis.executiveSummary}</p>
      </section>

      <section className="animate-slide-up">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Key Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysis.keyNumbers.map((kn, i) => (
            <div key={i} className="glass-card text-center">
              <p className="text-xs text-slate-400 mb-2">{kn.label}</p>
              <p className="text-2xl font-bold text-white mb-1">{kn.value}</p>
              {kn.change && (
                <span
                  className={`text-xs font-medium ${
                    kn.trend === 'up' ? 'text-emerald-400' : kn.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}
                >
                  {kn.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <ChartSection charts={analysis.charts} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
        <InsightList
          title="Business Insights"
          items={analysis.businessInsights}
          color="text-indigo-300"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        />
        <InsightList
          title="Growth Opportunities"
          items={analysis.growthOpportunities}
          color="text-emerald-300"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <InsightList
          title="Potential Risks"
          items={analysis.potentialRisks}
          color="text-amber-300"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
        <InsightList
          title="Recommendations"
          items={analysis.recommendations}
          color="text-purple-300"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
      </section>
    </div>
  );
}
