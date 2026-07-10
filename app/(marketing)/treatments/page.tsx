import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Hero";
import AppointmentCTA from "@/components/AppointmentCTA";
import { generateSEO } from "@/lib/seo";
import { getTreatments } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "Dental Treatments",
  description:
    "Explore Smilecare treatments — check-ups, root canals, whitening, implants, braces, pediatric dentistry, and smile makeovers in Navi Mumbai.",
  path: "/treatments",
});

export default async function TreatmentsPage() {
  const treatments = await getTreatments();

  return (
    <>
      <PageHero
        brand
        title="Treatments for every stage of your smile"
        subtitle="Clear options, gentle techniques, and plans explained before we begin."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/treatments/${treatment.slug}`}
              className="group overflow-hidden rounded-[1.75rem] bg-white/80 shadow-[0_8px_30px_rgba(15,92,92,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,92,92,0.1)]"
            >
              <div className="relative h-48">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl">{treatment.title}</h2>
                <p className="mt-2 text-sm text-muted">{treatment.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}
