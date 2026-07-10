"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Calendar } from "lucide-react";

export default function ExitIntentPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    if (sessionStorage.getItem("smilecare_exit_shown")) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("smilecare_exit_shown", "1");
        document.removeEventListener("mouseout", onMouseLeave);
      }
    };

    document.addEventListener("mouseout", onMouseLeave);
    return () => document.removeEventListener("mouseout", onMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70] hidden items-center justify-center p-4 lg:flex">
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        aria-label="Dismiss"
        onClick={() => setShow(false)}
      />
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-[0_30px_80px_rgba(15,92,92,0.2)]">
        <button
          type="button"
          onClick={() => setShow(false)}
          className="absolute right-4 top-4 rounded-xl p-2 text-muted hover:bg-mist"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="section-label">Before you go</p>
        <h2 className="heading-md mt-2">Book a calm consultation</h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Same-week appointments available. No pressure — just clear guidance for your smile.
        </p>
        <Link href="/book" className="btn-primary mt-6" onClick={() => setShow(false)}>
          <Calendar className="h-4 w-4" />
          Reserve my slot
        </Link>
      </div>
    </div>
  );
}
