import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import AppointmentCTA from "@/components/AppointmentCTA";
import { generateSEO } from "@/lib/seo";
import { getSiteContent } from "@/lib/db";
import { Award, Microscope, Sparkles } from "lucide-react";

export const metadata: Metadata = generateSEO({
  title: "About the Clinic",
  description:
    "Learn about Smilecare Dentist in Vashi, Navi Mumbai — our mission, sterilization standards, modern equipment, and patient-first philosophy.",
  path: "/about",
});

export default async function AboutPage() {
  const content = await getSiteContent();
  const { about } = content;

  return (
    <>
      <PageHero
        brand
        title="A clinic built for calm, clinical confidence"
        subtitle="Hospital-grade standards in a warm neighbourhood setting — designed so every visit feels clear and considered."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">Our history</p>
            <h2 className="heading-md">How Smilecare began</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{about.history}</p>
            <p className="mt-4 leading-relaxed text-muted">{about.philosophy}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=80"
              alt="Smilecare dental clinic"
              width={900}
              height={700}
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/50">
        <div className="container-custom grid gap-8 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-primary/10 bg-white/80 p-8">
            <p className="section-label">Mission</p>
            <p className="mt-3 font-display text-2xl text-ink">{about.mission}</p>
          </div>
          <div className="rounded-[1.75rem] border border-primary/10 bg-white/80 p-8">
            <p className="section-label">Vision</p>
            <p className="mt-3 font-display text-2xl text-ink">{about.vision}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <p className="section-label">Core values</p>
          <h2 className="heading-lg">What guides every appointment</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-xl">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/50">
        <div className="container-custom grid gap-12 lg:grid-cols-3">
          <div>
            <Award className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-display text-2xl">Achievements</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {about.achievements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Microscope className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-display text-2xl">Modern equipment</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {about.equipment.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Sparkles className="h-8 w-8 text-accent" />
            <h3 className="mt-4 font-display text-2xl">Sterilization</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {about.sterilization}
            </p>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}
