import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, ALL_FORMATS, FORMAT_LABELS } from '../api/client';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import DemoBanner from '../components/DemoBanner';

export default function Upload() {
  const { subscription, refreshStatus } = useAuth();
  const navigate = useNavigate();
  const [allowedFormats, setAllowedFormats] = useState<string[]>(['csv', 'xlsx', 'xls']);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const limitReached = subscription ? !subscription.canCreateReport : false;

  useEffect(() => {
    api.getSupportedFormats().then((d) => setAllowedFormats(d.formats)).catch(() => {});
  }, [subscription?.tier]);

  const handleUpload = async (file: File) => {
    if (limitReached) return;
    setUploading(true);
    setError('');
    try {
      const result = await api.uploadReport(file);
      await refreshStatus();
      navigate(`/report/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
      await refreshStatus();
    }
  };

  const handleSample = async () => {
    if (limitReached) return;
    setGenerating(true);
    setError('');
    try {
      const result = await api.generateSample();
      await refreshStatus();
      navigate(`/report/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sample generation failed');
      setGenerating(false);
      await refreshStatus();
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Upload Data</h1>
        <p className="text-sm text-slate-400 mt-1">
          {subscription
            ? `${subscription.reportsRemaining ?? '∞'} reports remaining this period`
            : 'Analyze your business data'}
        </p>
      </div>

      <DemoBanner />

      <FileUpload
        onUpload={handleUpload}
        loading={uploading}
        disabled={limitReached}
        allowedFormats={allowedFormats}
      />

      <button
        onClick={handleSample}
        disabled={generating || uploading || limitReached}
        className="btn-secondary w-full text-sm flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {generating ? (
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          'Generate from sample dataset'
        )}
      </button>

      <div className="glass-card">
        <h3 className="text-sm font-semibold text-white mb-3">Supported formats on your plan</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_FORMATS.map((fmt) => {
            const enabled = allowedFormats.includes(fmt);
            return (
              <span
                key={fmt}
                className={`px-2.5 py-1 rounded-lg text-xs ${
                  enabled
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                    : 'bg-white/5 text-slate-600 border border-white/5 line-through'
                }`}
              >
                {FORMAT_LABELS[fmt] ?? fmt.toUpperCase()}
              </span>
            );
          })}
        </div>
        {!allowedFormats.includes('json') && (
          <p className="text-xs text-slate-500 mt-3">Upgrade to Pro for JSON, XML, ODS, and TXT uploads.</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
      )}
    </div>
  );
}
