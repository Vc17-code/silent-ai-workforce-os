import Link from "next/link";
import { Calendar, MapPin, Phone, Shield } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink } from "@/lib/utils";

export default function AppointmentCTA() {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-14 text-white md:px-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Book your visit
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Ready when you are — same-week appointments available
              </h2>
              <p className="mt-4 max-w-xl text-white/75">
                Tell us what you need. We’ll confirm a convenient slot and send a reminder before your visit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="btn-primary bg-white !text-primary hover:bg-mist">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
                <a href={getPhoneLink(contactInfo.phone)} className="btn-ghost border border-white/20">
                  <Phone className="h-4 w-4" />
                  {contactInfo.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="space-y-4 rounded-[1.5rem] bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {contactInfo.address}, {contactInfo.city}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Insurance & corporate plans accepted · {contactInfo.insuranceAccepted[0]}
                </span>
              </div>
              <a
                href={contactInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-semibold text-accent hover:text-white"
              >
                {contactInfo.googleRating}★ on Google · Read reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="section-label">Location</p>
            <h2 className="heading-lg">Find us in Vashi</h2>
            <p className="mt-4 text-muted">
              {contactInfo.address}, {contactInfo.city} {contactInfo.pincode}
            </p>
            <p className="mt-2 text-sm text-muted">{contactInfo.businessHours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
              <a href={getPhoneLink(contactInfo.phone)} className="btn-secondary">
                <Phone className="h-4 w-4" />
                Call
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_8px_30px_rgba(15,92,92,0.06)]">
            <iframe
              title="Smilecare Dentist location map"
              src={contactInfo.mapEmbedUrl}
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
