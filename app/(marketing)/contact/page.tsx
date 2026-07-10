import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/Hero";
import AppointmentForm from "@/components/AppointmentForm";
import { contactInfo } from "@/lib/config";
import { generateSEO } from "@/lib/seo";
import { getEmailLink, getPhoneLink, getWhatsAppLink } from "@/lib/utils";
import { getTreatments } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "Contact",
  description:
    "Contact Smilecare Dentist in Vashi, Navi Mumbai — call, WhatsApp, email, or get directions to the clinic.",
  path: "/contact",
});

export default async function ContactPage() {
  const treatments = await getTreatments();

  return (
    <>
      <PageHero
        brand
        title="Contact Smilecare"
        subtitle="One-click call, WhatsApp, email, or directions — we’re here to help you book with confidence."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <ContactAction
              icon={Phone}
              label="Call clinic"
              value={contactInfo.phoneDisplay}
              href={getPhoneLink(contactInfo.phone)}
            />
            <ContactAction
              icon={Phone}
              label="Emergency"
              value={contactInfo.emergencyPhoneDisplay}
              href={getPhoneLink(contactInfo.emergencyPhone)}
            />
            <ContactAction
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with the clinic"
              href={getWhatsAppLink(
                contactInfo.whatsapp,
                "Hi Smilecare, I'd like to get in touch."
              )}
              external
            />
            <ContactAction
              icon={Mail}
              label="Email"
              value={contactInfo.email}
              href={getEmailLink(contactInfo.email, "Smilecare inquiry")}
            />
            <ContactAction
              icon={MapPin}
              label="Address"
              value={`${contactInfo.address}, ${contactInfo.city} ${contactInfo.pincode}`}
              href={contactInfo.mapLink}
              external
            />

            <div className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-5">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <Clock className="h-4 w-4 text-accent" />
                Business hours
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {contactInfo.businessHoursDetail.map((row) => (
                  <li key={row.day} className="flex justify-between gap-4">
                    <span>{row.day}</span>
                    <span className="font-medium text-ink">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-primary/10">
              <iframe
                title="Clinic map"
                src={contactInfo.mapEmbedUrl}
                className="h-[260px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-primary/10 bg-white/90 p-6 md:p-8">
            <h2 className="heading-md">Send a message</h2>
            <p className="mt-2 text-sm text-muted">
              Prefer a form? Request a callback or appointment below.
            </p>
            <div className="mt-6">
              <AppointmentForm
                treatments={treatments.map((t) => ({
                  slug: t.slug,
                  title: t.title,
                }))}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactAction({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-start gap-4 rounded-[1.5rem] border border-primary/10 bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/20"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mist text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="mt-1 block font-medium text-ink">{value}</span>
      </span>
    </a>
  );
}
