import { useAuth } from '../context/AuthContext';

export default function SubscriptionBadge() {
  const { subscription } = useAuth();
  if (!subscription) return null;

  const colors: Record<string, string> = {
    demo: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    starter: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    pro: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    business: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide border ${
        colors[subscription.tier] ?? colors.starter
      }`}
    >
      {subscription.planName}
    </span>
  );
}
