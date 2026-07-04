import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WhatsAppContact from './WhatsAppContact';
import { WHATSAPP_PASSKEY_MESSAGE } from '../constants/contact';

export default function DemoBanner() {
  const { isDemo, demoUsage, logout } = useAuth();
  const navigate = useNavigate();

  if (!isDemo || !demoUsage) return null;

  const pct = (demoUsage.used / demoUsage.limit) * 100;
  const atLimit = demoUsage.remaining === 0;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border ${
        atLimit
          ? 'bg-amber-500/10 border-amber-400/30'
          : 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 border-indigo-400/20'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/30 to-orange-500/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-white">
              {atLimit ? 'Demo limit reached' : 'Demo mode — premium preview'}
            </p>
            <p className="text-sm text-slate-400 mt-0.5">
              {atLimit
                ? 'You have used all 3 reports for this device. Register with an access key for unlimited reports.'
                : `${demoUsage.remaining} of ${demoUsage.limit} free reports remaining on this device. Explore the showcase report below.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end min-w-[140px]">
          <div className="w-full sm:w-40 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                atLimit ? 'bg-amber-400' : 'bg-gradient-to-r from-indigo-400 to-amber-400'
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            {demoUsage.used}/{demoUsage.limit} reports used
          </p>
          {atLimit && (
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.setItem('openRegister', '1');
                  logout();
                  navigate('/login');
                }}
                className="btn-primary text-sm text-center py-2 px-4"
              >
                Register with passkey
              </button>
              <WhatsAppContact
                variant="button"
                message={WHATSAPP_PASSKEY_MESSAGE}
                label="Get passkey on WhatsApp"
                className="!py-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
