import { useState, useEffect } from 'react';
import { api, SubscriptionPlan } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { FORMAT_LABELS } from '../api/client';
import WhatsAppContact from '../components/WhatsAppContact';
import { WHATSAPP_SUBSCRIPTION_MESSAGE } from '../constants/contact';

export default function Plans() {
  const { subscription, refreshStatus } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscriptionKey, setSubscriptionKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getPlans().then((d) => setPlans(d.plans)).catch(() => {});
  }, []);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const result = await api.activateSubscription(subscriptionKey);
      setMessage(result.message);
      setSubscriptionKey('');
      await refreshStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Subscription Plans</h1>
        <p className="text-sm text-slate-400 mt-1">
          Current plan: <span className="text-white font-medium">{subscription?.planName ?? '—'}</span>
        </p>
      </div>

      {subscription && (
        <div className="glass-card">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-400">Usage this period</span>
            <span className="text-sm font-medium text-white">
              {subscription.reportsUsed}
              {subscription.reportsLimit !== null ? ` / ${subscription.reportsLimit}` : ' (unlimited)'}
            </span>
          </div>
          {subscription.reportsLimit !== null && (
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                style={{
                  width: `${Math.min(100, (subscription.reportsUsed / subscription.reportsLimit) * 100)}%`,
                }}
              />
            </div>
          )}
          {subscription.expiresAt && (
            <p className="text-xs text-slate-500 mt-2">
              Renews {new Date(subscription.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {plans.map((plan) => {
          const isCurrent = subscription?.tier === plan.id;
          return (
            <div
              key={plan.id}
              className={`glass-card relative ${isCurrent ? 'ring-1 ring-indigo-400/50' : ''} ${
                plan.highlight ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/5' : ''
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500 text-white">
                  {plan.highlight}
                </span>
              )}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-white">{plan.name}</h3>
                  <p className="text-lg font-bold text-indigo-300 mt-0.5">{plan.price}</p>
                </div>
                {isCurrent && (
                  <span className="text-xs text-emerald-400 font-medium">Current</span>
                )}
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li>
                  {plan.reportsPerMonth === null
                    ? 'Unlimited reports'
                    : `${plan.reportsPerMonth} reports / month`}
                </li>
                <li>Formats: {plan.formats.map((f) => FORMAT_LABELS[f] ?? f).join(', ')}</li>
                <li>Exports: {plan.exports.map((e) => e.toUpperCase()).join(', ')}</li>
              </ul>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleActivate} className="glass-card space-y-3">
        <h3 className="text-sm font-semibold text-white">Activate subscription key</h3>
        <p className="text-xs text-slate-400">Enter a key provided upon purchase to upgrade your plan.</p>
        <input
          type="text"
          value={subscriptionKey}
          onChange={(e) => setSubscriptionKey(e.target.value)}
          className="input-field font-mono text-sm uppercase"
          placeholder="SUB-PRO-XXXX-XXXX-XXXX"
          required
        />
        {error && <p className="text-xs text-red-300">{error}</p>}
        {message && <p className="text-xs text-emerald-300">{message}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full text-sm">
          {loading ? 'Activating...' : 'Activate plan'}
        </button>
      </form>

      <WhatsAppContact
        variant="card"
        message={WHATSAPP_SUBSCRIPTION_MESSAGE}
        label="Need a subscription key?"
        description="Contact us on WhatsApp to purchase or upgrade your plan"
      />
    </div>
  );
}
