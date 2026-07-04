import { Link } from 'react-router-dom';
import { ReportSummary } from '../api/client';

interface ReportCardProps {
  report: ReportSummary;
  onDelete?: (id: number) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ReportCard({ report, onDelete }: ReportCardProps) {
  return (
    <div className="glass-card group animate-slide-up">
      <div className="flex items-start justify-between gap-4">
        <Link to={`/report/${report.id}`} className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                {report.title}
              </h3>
              <p className="text-xs text-slate-400">{report.filename}</p>
            </div>
          </div>

          {report.summary_preview && (
            <p className="text-sm text-slate-400 line-clamp-2 mb-3">{report.summary_preview}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
              </svg>
              {report.row_count} rows
            </span>
            <span>{formatDate(report.created_at)}</span>
          </div>
        </Link>

        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Delete this report?')) onDelete(report.id);
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            title="Delete report"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
