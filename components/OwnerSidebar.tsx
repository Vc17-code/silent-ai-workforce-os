"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

const links = [
  { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/owner/listings", label: "Listings", icon: Building2 },
  { href: "/owner/listings/new", label: "Add Property", icon: Plus },
  { href: "/owner/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/owner/settings", label: "Settings", icon: Settings },
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/owner/login";
  };

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <Link href="/owner/dashboard" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            DP
          </span>
          <div>
            <p className="font-bold text-primary">Owner Panel</p>
            <p className="text-xs text-slate-500">Disha Properties</p>
          </div>
        </Link>
      </div>

      <nav className="p-4" aria-label="Owner navigation">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <Link
          href="/"
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
        >
          ← View Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
