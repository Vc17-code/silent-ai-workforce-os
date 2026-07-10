import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { contactInfo } from "@/lib/config";
import type { Testimonial } from "@/types/clinic";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const featured = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section id="testimonials" className="section-padding bg-white/40">
      <div className="container-custom">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">Patient stories</p>
            <h2 className="heading-lg">Trusted by families across Navi Mumbai</h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-ink">
                {contactInfo.googleRating} Google rating
              </span>
              <span className="text-muted">
                · {contactInfo.googleReviewCount}+ reviews
              </span>
            </div>
          </div>
          <Link href="/reviews" className="btn-secondary">
            All reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-[1.75rem] border border-primary/8 bg-white/80 p-7"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="leading-relaxed text-ink/90">&ldquo;{item.text}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold text-ink">{item.name}</p>
                {item.treatment && (
                  <p className="text-sm text-muted">{item.treatment}</p>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
