"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { contactInfo, siteConfig } from "@/lib/config";
import { cn, getPhoneLink } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/doctor", label: "Doctor" },
  { href: "/treatments", label: "Treatments" },
  { href: "/gallery", label: "Smile Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tour", label: "Virtual Tour" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-primary/10 bg-white/85 shadow-[0_8px_30px_rgba(15,92,92,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary font-display text-lg text-white transition-transform duration-300 group-hover:scale-105">
            Sc
          </span>
          <div>
            <p className="font-display text-lg leading-none text-primary md:text-xl">
              {siteConfig.shortName}
            </p>
            <p className="mt-0.5 text-[11px] font-medium tracking-wide text-muted">
              Dentist · Navi Mumbai
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-mist text-primary"
                    : "text-muted hover:bg-white/70 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getPhoneLink(contactInfo.phone)}
            className="flex items-center gap-2 text-sm font-semibold text-primary"
            aria-label="Call Smilecare Dentist"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">{contactInfo.phoneDisplay}</span>
          </a>
          <Link href="/book" className="btn-primary !py-2.5 !text-sm">
            <Calendar className="h-4 w-4" />
            Book
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-primary hover:bg-white/70 xl:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-primary/10 bg-white/95 px-5 py-4 backdrop-blur-xl xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-mist"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary mt-3 w-full">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
