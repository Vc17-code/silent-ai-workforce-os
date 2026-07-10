import type { Metadata } from "next";
import Link from "next/link";
import { Star, ExternalLink, Play } from "lucide-react";
import { PageHero } from "@/components/Hero";
import AppointmentCTA from "@/components/AppointmentCTA";
import { contactInfo } from "@/lib/config";
import { generateSEO } from "@/lib/seo";
import { getTestimonials } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "Patient Reviews",
  description:
    "Read Google reviews and patient stories from Smilecare Dentist in Vashi, Navi Mumbai.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();
  const videoStories = testimonials.filter((t) => t.videoUrl);
  const avg =
    testimonials.reduce((sum, t) => sum + t.rating, 0) /
    Math.max(testimonials.length, 1);

  return (
    <>
      <PageHero
        brand
        title="Patient reviews & stories"
        subtitle="Transparent feedback from families who trust Smilecare with their smiles."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-6 rounded-[2rem] border border-primary/10 bg-white/80 p-8 md:grid-cols-3">
            <Stat
              label="Google rating"
              value={`${contactInfo.googleRating}`}
              hint="out of 5"
            />
            <Stat
              label="Reviews"
              value={`${contactInfo.googleReviewCount}+`}
              hint="on Google"
            />
            <Stat
              label="Clinic average"
              value={avg.toFixed(1)}
              hint="from featured stories"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contactInfo.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Leave a Google review
            </a>
            <Link href="/book" className="btn-secondary">
              Book after reading
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="rounded-[1.75rem] border border-primary/8 bg-white/80 p-7"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="leading-relaxed text-ink/90">&ldquo;{item.text}&rdquo;</p>
                <footer className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted">
                      {item.treatment || "Patient"} · {item.source}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-16">
            <p className="section-label">Video testimonials</p>
            <h2 className="heading-md">Stories on camera</h2>
            {videoStories.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] border border-dashed border-primary/20 bg-mist/40 p-10 text-center">
                <Play className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-4 font-medium text-ink">Video stories coming soon</p>
                <p className="mt-2 text-sm text-muted">
                  Owner can upload video testimonials from the admin dashboard without code changes.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {videoStories.map((v) => (
                  <a
                    key={v.id}
                    href={v.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-[1.5rem] border border-primary/10 bg-white p-5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-primary">
                      <Play className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{v.name}</span>
                      <span className="text-sm text-muted">{v.treatment}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="text-center md:text-left">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-4xl text-primary">{value}</p>
      <p className="text-sm text-muted">{hint}</p>
    </div>
  );
}
