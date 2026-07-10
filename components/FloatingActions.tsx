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
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-white/95 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4 gap-1 px-2 py-2 safe-area-pb">
          <a
            href={getPhoneLink(contactInfo.phone)}
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold text-primary"
          >
            <Phone className="h-5 w-5" />
            Call
          </a>
          <a
            href={getWhatsAppLink(contactInfo.whatsapp, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold text-primary"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <Link
            href="/book"
            className="flex flex-col items-center gap-1 rounded-xl bg-primary py-2 text-[11px] font-semibold text-white"
          >
            <Calendar className="h-5 w-5" />
            Book
          </Link>
          <a
            href={contactInfo.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold text-primary"
          >
            <MapPin className="h-5 w-5" />
            Directions
          </a>
        </div>
      </div>
    </>
  );
}
