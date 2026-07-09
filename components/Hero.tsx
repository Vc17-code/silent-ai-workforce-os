import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { contactInfo } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

const stats = [
  { value: "16+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "100+", label: "Properties Sold" },
  { value: "24/7", label: "Customer Support" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        alt="Modern luxury property in Ajmer"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="container-custom relative z-10 py-20 text-white">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            Residential • Commercial • Plots • Investment Properties
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Find Your Dream Property in Ajmer
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
            Trusted Real Estate Experts with 16+ Years of Experience in Residential &amp; Commercial Properties.
            Helping families and investors make confident property decisions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              View Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={getPhoneLink(contactInfo.phone)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-blue-50"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <a
              href={getWhatsAppLink(contactInfo.whatsapp, "Hi, I want to inquire about properties in Ajmer.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-accent md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative bg-primary py-20 text-white">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="container-custom relative">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-blue-100">{subtitle}</p>}
      </div>
    </section>
  );
}
