import type { Metadata } from "next";
import type { ComponentType } from "react";
import { PageHero } from "@/components/Hero";
import AppointmentForm from "@/components/AppointmentForm";
import { contactInfo } from "@/lib/config";
import { generateSEO } from "@/lib/seo";
import { getTreatments } from "@/lib/db";
import { Shield, Clock, Star } from "lucide-react";

export const metadata: Metadata = generateSEO({
  title: "Book Appointment",
  description:
    "Book a dental appointment at Smilecare Dentist, Vashi, Navi Mumbai. Same-week slots available.",
  path: "/book",
});

export default async function BookPage() {
  const treatments = await getTreatments();

  return (
    <>
      <PageHero
        brand
        title="Book an appointment"
        subtitle="Share your preferred time — we’ll confirm by phone or WhatsApp, usually within a few hours."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-primary/10 bg-white/90 p-6 md:p-8">
            <AppointmentForm
              treatments={treatments.map((t) => ({
                slug: t.slug,
                title: t.title,
              }))}
            />
          </div>
          <div className="space-y-4">
            <TrustCard
              icon={Clock}
              title="Flexible hours"
              text={contactInfo.businessHours}
            />
            <TrustCard
              icon={Shield}
              title="Insurance friendly"
              text={contactInfo.insuranceAccepted.join(" · ")}
            />
            <TrustCard
              icon={Star}
              title="Highly rated"
              text={`${contactInfo.googleRating}★ from ${contactInfo.googleReviewCount}+ Google reviews`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function TrustCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-primary/10 bg-white/80 p-5">
      <div className="flex items-center gap-2 font-semibold text-ink">
        <Icon className="h-4 w-4 text-accent" />
        {title}
      </div>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </div>
  );
}
