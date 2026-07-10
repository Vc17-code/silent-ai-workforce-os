"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Calendar } from "lucide-react";

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-booking-modal", handler);
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        aria-label="Close booking prompt"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_30px_80px_rgba(15,92,92,0.2)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-xl p-2 text-muted hover:bg-mist"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="section-label">Quick booking</p>
        <h2 className="heading-md mt-2">Ready for a healthier smile?</h2>
        <p className="mt-3 text-muted">
          Reserve a consultation in under a minute. We’ll confirm your preferred slot by phone or WhatsApp.
        </p>
        <Link
          href="/book"
          onClick={() => setOpen(false)}
          className="btn-primary mt-6 w-full"
        >
          <Calendar className="h-4 w-4" />
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export function openBookingModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-booking-modal"));
  }
}
