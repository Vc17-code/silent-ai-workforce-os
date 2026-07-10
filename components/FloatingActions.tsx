"use client";

import Link from "next/link";
import { Phone, MessageCircle, Calendar, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

const whatsappMessage =
  "Hi Smilecare Dentist, I'd like to book an appointment.";

export default function FloatingActions() {
  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-8 right-6 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={getWhatsAppLink(contactInfo.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-0.5"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={getPhoneLink(contactInfo.phone)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_30px_rgba(15,92,92,0.3)] transition-transform hover:-translate-y-0.5"
          aria-label="Call Smilecare"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          href="/book"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_10px_30px_rgba(61,155,143,0.3)] transition-transform hover:-translate-y-0.5"
          aria-label="Book appointment"
        >
          <Calendar className="h-5 w-5" />
        </Link>
      </div>

      {/* Mobile sticky bottom bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-white/95 backdrop-blur-xl md:hidden"
        aria-label="Mobile quick actions"
      >
        <div className="safe-area-pb grid grid-cols-4 gap-1 px-1.5 pt-1.5">
          <a
            href={getPhoneLink(contactInfo.phone)}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold text-primary active:bg-mist"
          >
            <Phone className="h-5 w-5" />
            Call
          </a>
          <a
            href={getWhatsAppLink(contactInfo.whatsapp, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold text-primary active:bg-mist"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <Link
            href="/book"
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl bg-primary py-2 text-[11px] font-semibold text-white active:bg-primary-soft"
          >
            <Calendar className="h-5 w-5" />
            Book
          </Link>
          <a
            href={contactInfo.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold text-primary active:bg-mist"
          >
            <MapPin className="h-5 w-5" />
            Directions
          </a>
        </div>
      </nav>
    </>
  );
}
