import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, ReportSummary } from '../api/client';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import ReportCard from '../components/ReportCard';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = useCallback(async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const result = await api.uploadReport(file);
      navigate(`/report/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
    }
  };

  const handleSample = async () => {
    setGenerating(true);
    setError('');
    try {
      const result = await api.generateSample();
      navigate(`/report/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sample generation failed');
      setGenerating(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteReport(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError('Failed to delete report');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-sm sm:text-base text-slate-400">Upload your business data and get AI-powered insights in seconds.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Reports Generated', value: reports.length, icon: '📊' },
          { label: 'Supported Formats', value: 'CSV, XLSX', icon: '📁' },
          { label: 'Export Options', value: 'PDF, Word, HTML', icon: '📥' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card flex items-center gap-4">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Upload Data</h2>
            <button
              onClick={handleSample}
              disabled={generating || uploading}
              className="btn-secondary text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {generating ? (
                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              )}
              Try sample dataset
            </button>
          </div>
          <FileUpload onUpload={handleUpload} loading={uploading} />
        </div>

        <div className="lg:col-span-2 glass-card">
          <h3 className="text-sm font-semibold text-white mb-4">How it works</h3>
          <ol className="space-y-4">
            {[
              { step: '1', text: 'Upload your CSV or Excel file with business data' },
              { step: '2', text: 'AI analyzes patterns, trends, and key metrics' },
              { step: '3', text: 'Review insights, charts, and recommendations' },
              { step: '4', text: 'Download as PDF, Word, or HTML' },
            ].map((item) => (
              <li key={item.step} className="flex gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </span>
                <span className="text-sm text-slate-300 pt-0.5">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Reports</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <div className="glass-card text-center py-12">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400 mb-2">No reports yet</p>
            <p className="text-sm text-slate-500">Upload a file or try the sample dataset to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
