import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, Stethoscope, HeartHandshake } from "lucide-react";
import { doctorProfile, siteConfig } from "@/lib/config";
import type { SiteContent } from "@/types/clinic";

const icons = [HeartHandshake, Stethoscope, ShieldCheck, Sparkles];

export default function IntroSection({ content }: { content: SiteContent }) {
  return (
    <section className="section-padding">
      <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-label">The clinic</p>
          <h2 className="heading-lg text-balance">
            A quieter kind of dental care in Navi Mumbai
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {content.about.history}
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            {content.about.philosophy}
          </p>
          <Link href="/about" className="btn-secondary mt-8">
            Our story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 to-primary/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1000&q=80"
              alt={`${siteConfig.name} clinic interior`}
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DoctorHighlight() {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="glass grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[360px]">
            <Image
              src={doctorProfile.photo}
              alt={doctorProfile.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="section-label">Meet the doctor</p>
            <h2 className="heading-md">{doctorProfile.name}</h2>
            <p className="mt-2 text-sm font-semibold text-accent">
              {doctorProfile.credentials}
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              {doctorProfile.shortBio}
            </p>
            <Link href="/doctor" className="btn-primary mt-8 w-fit">
              Full profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs({ items }: { items: SiteContent["whyChooseUs"] }) {
  return (
    <section className="section-padding bg-white/40">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Why Smilecare</p>
          <h2 className="heading-lg">Trust built into every visit</h2>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.title} className="group">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-primary transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
