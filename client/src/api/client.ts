export interface User {
  id: number;
  email: string;
  name: string;
  accountType: 'demo' | 'registered';
}

export interface DemoUsage {
  used: number;
  limit: number;
  remaining: number;
}

export interface KeyNumber {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  type: 'bar' | 'line' | 'doughnut';
  title: string;
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor?: string | string[] }[];
}

export interface Analysis {
  executiveSummary: string;
  keyNumbers: KeyNumber[];
  businessInsights: string[];
  growthOpportunities: string[];
  potentialRisks: string[];
  recommendations: string[];
  charts: ChartData[];
}

export interface ReportSummary {
  id: number;
  title: string;
  filename: string;
  row_count: number;
  created_at: string;
  summary_preview?: string;
  is_showcase?: number;
}

export interface ReportDetail {
  id: number;
  title: string;
  filename: string;
  rowCount: number;
  columns: string[];
  data: Record<string, string | number>[];
  analysis: Analysis;
  createdAt: string;
  isShowcase?: boolean;
}

const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: User; demoUsage?: DemoUsage }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, name: string, accessKey: string) =>
    request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, accessKey }),
    }),

  getMe: () => request<{ user: User; demoUsage?: DemoUsage }>('/auth/me'),

  getReports: () => request<ReportSummary[]>('/reports'),

  getReport: (id: number) => request<ReportDetail>(`/reports/${id}`),

  uploadReport: (file: File, title?: string) => {
    const form = new FormData();
    form.append('file', file);
    if (title) form.append('title', title);
    return request<{ id: number; title: string; analysis: Analysis; demoUsage?: DemoUsage }>(
      '/reports/upload',
      { method: 'POST', body: form, headers: {} }
    );
  },

  generateSample: () =>
    request<{ id: number; title: string; analysis: Analysis; demoUsage?: DemoUsage }>(
      '/reports/sample/generate',
      { method: 'POST' }
    ),

  deleteReport: (id: number) => request<{ success: boolean }>(`/reports/${id}`, { method: 'DELETE' }),

  downloadReport: async (id: number, format: 'pdf' | 'docx' | 'html') => {
    const token = getToken();
    const res = await fetch(`${API_BASE}/reports/${id}/download/${format}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Download failed');
    const blob = await res.blob();
    const ext = format === 'docx' ? 'docx' : format;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
