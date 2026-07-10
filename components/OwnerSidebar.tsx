"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Images,
  MessageSquareQuote,
  Video,
  UserRound,
  HelpCircle,
  Tag,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/owner/appointments", label: "Appointments", icon: Calendar },
  { href: "/owner/treatments", label: "Treatments", icon: Stethoscope },
  { href: "/owner/gallery", label: "Gallery", icon: Images },
  { href: "/owner/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/owner/media", label: "Video & 360° Tour", icon: Video },
  { href: "/owner/doctor", label: "Doctor Profile", icon: UserRound },
  { href: "/owner/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/owner/offers", label: "Offers", icon: Tag },
  { href: "/owner/settings", label: "SEO & Content", icon: Settings },
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/owner/login";
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-primary/10 bg-white">
      <div className="border-b border-primary/10 p-5">
        <Link href="/owner/dashboard" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary font-display text-sm text-white">
            Sc
          </span>
          <div>
            <p className="font-semibold text-primary">Owner Panel</p>
            <p className="text-xs text-muted">Smilecare Dentist</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Owner navigation">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-mist hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-primary/10 p-3">
        <Link
          href="/"
          className="mb-1 block rounded-xl px-3 py-2 text-sm text-muted hover:bg-mist"
        >
          ← View website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
