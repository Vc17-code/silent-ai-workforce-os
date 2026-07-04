import { useAuth } from '../context/AuthContext';
import SubscriptionBadge from '../components/SubscriptionBadge';
import WhatsAppContact from '../components/WhatsAppContact';
import { FORMAT_LABELS } from '../api/client';
import { WHATSAPP_PASSKEY_MESSAGE } from '../constants/contact';

export default function Account() {
  const { user, subscription, logout } = useAuth();

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Account</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your profile and subscription</p>
      </div>

      <div className="glass-card space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white">
            {user?.name?.charAt(0) ?? '?'}
          </div>
          <div>
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
            <div className="mt-1.5">
              <SubscriptionBadge />
            </div>
          </div>
        </div>
      </div>

      {subscription && (
        <div className="glass-card space-y-3">
          <h3 className="text-sm font-semibold text-white">Plan details</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Reports used</p>
              <p className="text-white font-medium">
                {subscription.reportsUsed}
                {subscription.reportsLimit !== null ? ` / ${subscription.reportsLimit}` : ' (unlimited)'}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Remaining</p>
              <p className="text-white font-medium">
                {subscription.reportsRemaining ?? '∞'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-2">Upload formats</p>
            <div className="flex flex-wrap gap-1.5">
              {subscription.formats.map((f) => (
                <span key={f} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                  {FORMAT_LABELS[f] ?? f}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-xs mb-2">Export formats</p>
            <div className="flex flex-wrap gap-1.5">
              {subscription.exports.map((e) => (
                <span key={e} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-slate-300">
                  {e.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <WhatsAppContact
        variant="card"
        message={WHATSAPP_PASSKEY_MESSAGE}
        label="Contact support on WhatsApp"
        description="Request a passkey or get help with your account"
      />

      <button onClick={logout} className="btn-secondary w-full text-sm">
        Sign out
      </button>
    </div>
  );
}
