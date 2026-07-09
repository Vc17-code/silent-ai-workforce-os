"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
            DP
          </span>
          <div className="hidden sm:block">
            <p className="text-lg font-bold text-primary">Disha Properties</p>
            <p className="text-xs text-slate-500">Ajmer&apos;s Trusted Realtors</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getPhoneLink(contactInfo.phone)}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary"
            aria-label="Call Disha Properties"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">9414435920</span>
          </a>
          <a
            href={getWhatsAppLink(contactInfo.whatsapp, "Hi, I'm interested in a property in Ajmer.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <a
                href={getPhoneLink(contactInfo.phone)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <a
                href={getWhatsAppLink(contactInfo.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
