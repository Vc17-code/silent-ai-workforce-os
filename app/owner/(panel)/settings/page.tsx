import OwnerSidebar from "@/components/OwnerSidebar";
import { contactInfo } from "@/lib/config";

export default function OwnerSettingsPage() {
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">Business information and account settings.</p>

        <div className="mt-8 max-w-2xl space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Business Information</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Business Name</dt>
                <dd className="font-medium">{contactInfo.businessName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Phone</dt>
                <dd className="font-medium">{contactInfo.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium">{contactInfo.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Address</dt>
                <dd className="font-medium text-right">{contactInfo.address}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-slate-400">
              To update business details, edit <code className="rounded bg-slate-100 px-1">lib/config.ts</code>
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Owner Password</h2>
            <p className="mt-2 text-sm text-slate-600">
              Set your owner password via the <code className="rounded bg-slate-100 px-1">OWNER_PASSWORD</code> environment variable.
              Default password for development: <code className="rounded bg-slate-100 px-1">disha2024</code>
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-bold text-amber-800">Premium Plan Features</h2>
            <ul className="mt-3 space-y-2 text-sm text-amber-700">
              <li>✓ Unlimited property listings</li>
              <li>✓ Unlimited photos and videos</li>
              <li>✓ Featured property placement</li>
              <li>✓ Lead management dashboard</li>
              <li>✓ Mark properties sold/rented</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
