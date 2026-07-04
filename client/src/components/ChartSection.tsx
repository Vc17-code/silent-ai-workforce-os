import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { ChartData } from '../api/client';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#94a3b8', font: { family: 'Inter' } },
    },
  },
  scales: {
    x: {
      ticks: { color: '#64748b', font: { size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' },
    },
    y: {
      ticks: { color: '#64748b', font: { size: 11 } },
      grid: { color: 'rgba(255,255,255,0.05)' },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 }, padding: 12 },
    },
  },
};

interface ChartSectionProps {
  charts: ChartData[];
}

function renderChart(chart: ChartData) {
  const data = {
    labels: chart.labels,
    datasets: chart.datasets.map((ds) => ({
      ...ds,
      borderColor: chart.type === 'line' ? '#6366f1' : undefined,
      backgroundColor:
        ds.backgroundColor ||
        (chart.type === 'line' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.7)'),
      fill: chart.type === 'line',
      tension: 0.4,
      borderWidth: chart.type === 'line' ? 2 : 0,
    })),
  };

  if (chart.type === 'line') return <Line data={data} options={chartOptions} />;
  if (chart.type === 'doughnut') return <Doughnut data={data} options={doughnutOptions} />;
  return <Bar data={data} options={chartOptions} />;
}

export default function ChartSection({ charts }: ChartSectionProps) {
  if (charts.length === 0) return null;

  return (
    <section className="animate-slide-up">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Visual Charts
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, i) => (
          <div key={i} className="glass-card">
            <h3 className="text-sm font-medium text-slate-300 mb-4">{chart.title}</h3>
            <div className="h-64">{renderChart(chart)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
