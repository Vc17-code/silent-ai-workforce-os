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

      <div className="container-custom relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-32 md:justify-center md:pb-24 md:pt-20">
        <div className="max-w-3xl text-white">
          <p className="reveal section-label !text-accent/90 !text-white/80">
            {siteConfig.name}
          </p>
          <h1 className="reveal reveal-delay-1 mt-3 font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg text-white/80 md:text-xl">
            {hero.subheadline}
          </p>
          <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-3">
            <Link href="/book" className="btn-primary bg-white !text-primary hover:bg-mist">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>
            <a href={getPhoneLink(contactInfo.phone)} className="btn-ghost border border-white/25">
              <Phone className="h-4 w-4" />
              Call Clinic
            </a>
            <Link href="/treatments" className="btn-ghost">
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
    <section className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-br from-mist via-sand to-white py-20 md:py-24">
      <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-custom relative">
        {brand && (
          <p className="section-label">{siteConfig.name}</p>
        )}
        <h1 className="heading-lg max-w-3xl text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
