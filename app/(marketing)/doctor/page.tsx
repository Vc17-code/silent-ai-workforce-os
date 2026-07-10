import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import AppointmentCTA from "@/components/AppointmentCTA";
import { generateSEO, physicianJsonLd } from "@/lib/seo";
import { getDoctor } from "@/lib/db";

export const metadata: Metadata = generateSEO({
  title: "Meet the Doctor",
  description:
    "Meet Dr. Ananya Mehta — lead dentist at Smilecare Dentist, Navi Mumbai. Qualifications, specializations, and treatment philosophy.",
  path: "/doctor",
});

export default async function DoctorPage() {
  const doctor = await getDoctor();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd(doctor)) }}
      />
      <PageHero
        brand
        title={doctor.name}
        subtitle={`${doctor.title} · ${doctor.credentials}`}
      />

      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src={doctor.photo}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
          <div>
            <p className="section-label">Biography</p>
            <h2 className="heading-md">Precision with a gentle chairside manner</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{doctor.biography}</p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display text-xl text-ink">
              {doctor.philosophy}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/50">
        <div className="container-custom grid gap-10 md:grid-cols-2">
          <InfoList title="Qualifications" items={doctor.qualifications} />
          <InfoList title="Experience" items={doctor.experience} />
          <InfoList title="Certifications" items={doctor.certifications} />
          <InfoList title="Memberships" items={doctor.memberships} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <p className="section-label">Recognition</p>
          <h2 className="heading-lg">Awards & specializations</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl">Awards</h3>
              <ul className="mt-4 space-y-3 text-muted">
                {doctor.awards.map((a) => (
                  <li key={a} className="rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-sm">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl">Areas of specialization</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.specializations.map((s) => (
                  <span
                    key={s}
                    className="rounded-2xl bg-mist px-4 py-2 text-sm font-medium text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/40">
        <div className="container-custom">
          <p className="section-label">Professional gallery</p>
          <h2 className="heading-lg mb-10">Inside the practice</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {doctor.gallery.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={src}
                  alt={`${doctor.name} clinic photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
