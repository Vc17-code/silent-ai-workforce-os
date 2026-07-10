import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Treatment } from "@/types/clinic";

export default function FeaturedTreatments({
  treatments,
}: {
  treatments: Treatment[];
}) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="section-label">Treatments</p>
            <h2 className="heading-lg">Care designed around your smile</h2>
          </div>
          <Link href="/treatments" className="btn-secondary">
            All treatments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/treatments/${treatment.slug}`}
              className="group overflow-hidden rounded-[1.75rem] bg-white/70 shadow-[0_8px_30px_rgba(15,92,92,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,92,92,0.1)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-ink">{treatment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {treatment.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
