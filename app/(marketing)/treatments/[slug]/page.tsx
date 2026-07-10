import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/Hero";
import AppointmentForm from "@/components/AppointmentForm";
import FAQAccordion from "@/components/FAQAccordion";
import { generateSEO, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { getTreatmentBySlug, getTreatments } from "@/lib/db";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const treatments = await getTreatments();
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return generateSEO({ title: "Treatment" });
  return generateSEO({
    title: treatment.title,
    description: treatment.shortDescription,
    path: `/treatments/${treatment.slug}`,
    image: treatment.image,
  });
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const all = await getTreatments();
  const related = all.filter((t) => treatment.relatedSlugs.includes(t.slug));
  const faqs = treatment.faqs.map((f, i) => ({
    id: `${treatment.id}-faq-${i}`,
    question: f.question,
    answer: f.answer,
    category: treatment.title,
    order: i,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(treatment)),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      )}

      <PageHero title={treatment.title} subtitle={treatment.shortDescription} brand />

      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-[1.75rem]">
              <Image
                src={treatment.image}
                alt={treatment.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            <p className="section-label">Overview</p>
            <p className="mt-3 text-lg leading-relaxed text-muted">{treatment.overview}</p>

            <h2 className="heading-md mt-12">Benefits</h2>
            <ul className="mt-4 space-y-3">
              {treatment.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="heading-md mt-12">Procedure</h2>
            <ol className="mt-4 space-y-4">
              {treatment.procedure.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-mist text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-muted">{step}</span>
                </li>
              ))}
            </ol>

            <h2 className="heading-md mt-12">Recovery</h2>
            <p className="mt-3 text-muted">{treatment.recovery}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white/80 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Clock className="h-4 w-4" />
                  Estimated duration
                </div>
                <p className="mt-2 text-muted">{treatment.duration}</p>
              </div>
              <div className="rounded-2xl border border-primary/10 bg-white/80 p-5">
                <p className="text-sm font-semibold text-primary">Suitable candidates</p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {treatment.suitableFor.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="heading-md mb-6">Frequently asked questions</h2>
                <FAQAccordion faqs={faqs} />
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-primary/10 bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,92,92,0.06)]">
              <h3 className="font-display text-2xl">Book this treatment</h3>
              <p className="mt-2 text-sm text-muted">
                Request a slot — we’ll confirm shortly.
              </p>
              <div className="mt-6">
                <AppointmentForm
                  treatments={all.map((t) => ({ slug: t.slug, title: t.title }))}
                  defaultTreatment={treatment.title}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-white/40">
          <div className="container-custom">
            <h2 className="heading-md">Related treatments</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <Link
                  key={t.id}
                  href={`/treatments/${t.slug}`}
                  className="group rounded-[1.5rem] border border-primary/10 bg-white/80 p-5 transition-all hover:-translate-y-0.5"
                >
                  <h3 className="font-display text-xl">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted">{t.shortDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
