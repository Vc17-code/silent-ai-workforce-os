import { useState, useCallback } from 'react';

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export default function FileUpload({ onUpload, loading }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const ext = file.name.toLowerCase().split('.').pop();
      if (ext !== 'csv' && ext !== 'xlsx' && ext !== 'xls') {
        alert('Please upload a CSV or XLSX file.');
        return;
      }
      setFileName(file.name);
      onUpload(file);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`glass-card border-2 border-dashed transition-all duration-300 cursor-pointer ${
        dragOver ? 'border-indigo-400/60 bg-indigo-500/10 scale-[1.01]' : 'border-white/20 hover:border-white/30'
      } ${loading ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <label className="flex flex-col items-center py-10 px-6 cursor-pointer">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          disabled={loading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4">
          {loading ? (
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          )}
        </div>

        <p className="text-lg font-medium text-white mb-1">
          {loading ? 'Analyzing your data...' : 'Drag & drop your file here'}
        </p>
        <p className="text-sm text-slate-400 mb-4">or click to browse</p>

        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-lg bg-white/10 text-xs text-slate-300">CSV</span>
          <span className="px-3 py-1 rounded-lg bg-white/10 text-xs text-slate-300">XLSX</span>
        </div>

        {fileName && !loading && (
          <p className="mt-4 text-sm text-indigo-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {fileName}
          </p>
        )}
      </label>
    </div>
  );
}
