import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { contactInfo, defaultMediaAssets, siteConfig } from "@/lib/config";
import { getPhoneLink } from "@/lib/utils";
import type { MediaAssets } from "@/types/clinic";

export default function Hero({ media }: { media?: MediaAssets }) {
  const hero = media?.heroBanner ?? defaultMediaAssets.heroBanner;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={hero.image}
        alt="Modern dental treatment room at Smilecare Dentist"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-primary/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

      <div className="container-custom relative z-10 flex min-h-[100svh] flex-col justify-end pb-32 pt-28 md:justify-center md:pb-24 md:pt-20">
        <div className="max-w-3xl text-white">
          <p className="reveal section-label !mb-2 !text-white/80">
            {siteConfig.name}
          </p>
          <h1 className="reveal reveal-delay-1 mt-2 font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="reveal reveal-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg md:text-xl">
            {hero.subheadline}
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link href="/book" className="btn-primary w-full bg-white !text-primary hover:bg-mist sm:w-auto">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>
            <a href={getPhoneLink(contactInfo.phone)} className="btn-ghost w-full border border-white/25 sm:w-auto">
              <Phone className="h-4 w-4" />
              Call Clinic
            </a>
            <Link href="/treatments" className="btn-ghost hidden sm:inline-flex">
              Explore treatments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  title,
  subtitle,
  brand = false,
}: {
  title: string;
  subtitle?: string;
  brand?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-br from-mist via-sand to-white py-14 md:py-24">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-custom relative">
        {brand && (
          <p className="section-label">{siteConfig.name}</p>
        )}
        <h1 className="heading-lg max-w-3xl text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
