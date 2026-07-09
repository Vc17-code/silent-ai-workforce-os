import OwnerSidebar from "@/components/OwnerSidebar";
import { getDashboardStats } from "@/lib/db";
import { Building2, MessageSquare, Star, Eye } from "lucide-react";
import Link from "next/link";

export default async function OwnerDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "bg-blue-100 text-primary",
      href: "/owner/listings",
    },
    {
      label: "Active Listings",
      value: stats.activeListings,
      icon: Eye,
      color: "bg-emerald-100 text-secondary",
      href: "/owner/listings",
    },
    {
      label: "Featured",
      value: stats.featuredListings,
      icon: Star,
      color: "bg-amber-100 text-accent",
      href: "/owner/listings",
    },
    {
      label: "Unread Inquiries",
      value: stats.unreadInquiries,
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
      href: "/owner/enquiries",
    },
  ];

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">Welcome to Disha Properties management panel.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="card-hover rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              <Link
                href="/owner/listings/new"
                className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary-dark"
              >
                + Add New Property
              </Link>
              <Link
                href="/owner/listings"
                className="block rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Manage Listings
              </Link>
              <Link
                href="/owner/enquiries"
                className="block rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View Inquiries ({stats.totalInquiries})
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Premium Features</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Unlimited property listings
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Upload images & videos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Feature properties on homepage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Mark properties as sold/rented
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Manage customer inquiries
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
