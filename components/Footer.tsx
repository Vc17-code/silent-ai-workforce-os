import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import { contactInfo, siteConfig } from "@/lib/config";
import { getEmailLink, getPhoneLink, getWhatsAppLink } from "@/lib/utils";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/doctor", label: "Meet the Doctor" },
  { href: "/treatments", label: "Treatments" },
  { href: "/gallery", label: "Smile Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tour", label: "Virtual Tour" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book Appointment" },
];

const treatments = [
  "Check-up & Cleaning",
  "Root Canal",
  "Teeth Whitening",
  "Dental Implants",
  "Smile Makeover",
  "Pediatric Care",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(61,155,143,0.25),transparent_50%)]" />
      <div className="container-custom relative section-padding !pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 font-display text-lg">
                Sc
              </span>
              <div>
                <p className="font-display text-xl">{siteConfig.name}</p>
                <p className="text-sm text-white/70">{contactInfo.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              Calm, modern dental care in Vashi — built around trust, clinical precision, and lasting comfort.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span className="font-semibold">{contactInfo.googleRating}</span>
              <span className="text-white/70">
                · {contactInfo.googleReviewCount}+ Google reviews
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Explore</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Treatments</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {treatments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Visit</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {contactInfo.address}, {contactInfo.city} {contactInfo.pincode}
                </a>
              </li>
              <li>
                <a
                  href={getPhoneLink(contactInfo.phone)}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getEmailLink(contactInfo.email, "Appointment inquiry")}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                {contactInfo.businessHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/60 md:flex-row md:items-center">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={getWhatsAppLink(contactInfo.whatsapp, "Hi Smilecare, I'd like to book an appointment.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>
            <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Directions
            </a>
            <Link href="/owner/login" className="hover:text-white">
              Owner Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
