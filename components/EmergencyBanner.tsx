import { Phone } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink } from "@/lib/utils";

export default function EmergencyBanner() {
  return (
    <div className="bg-ink text-white">
      <div className="container-custom flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-xs sm:text-sm">
        <span className="text-white/70">Dental emergency?</span>
        <a
          href={getPhoneLink(contactInfo.emergencyPhone)}
          className="inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-white"
        >
          <Phone className="h-3.5 w-3.5" />
          {contactInfo.emergencyPhoneDisplay}
        </a>
        <span className="hidden text-white/40 sm:inline">·</span>
        <span className="text-white/70">Same-day priority when available</span>
      </div>
    </div>
  );
}
