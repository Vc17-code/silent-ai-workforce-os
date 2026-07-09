import Link from "next/link";
import { Shield, Users, Handshake, TrendingUp } from "lucide-react";

const aboutCards = [
  {
    icon: Shield,
    title: "Residential Specialists",
    description: "Expert guidance for apartments, villas, and homes across Ajmer.",
  },
  {
    icon: Users,
    title: "Commercial Experts",
    description: "Offices, shops, and commercial spaces for businesses of all sizes.",
  },
  {
    icon: TrendingUp,
    title: "Investment Guidance",
    description: "Data-driven advice on high-ROI properties and emerging areas.",
  },
  {
    icon: Handshake,
    title: "Honest Consultation",
    description: "Transparent dealings with no hidden charges or surprises.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              About Us
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Welcome to Disha Properties
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Finding the right property is one of life&apos;s biggest decisions. At Disha Properties,
              we simplify the process through local expertise, transparent advice, and personalized service.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you&apos;re buying your first home, investing in commercial real estate, or
              searching for the perfect plot, we&apos;re committed to helping you make the right choice.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-xl bg-primary/5 px-5 py-3">
                <p className="text-2xl font-bold text-primary">16+</p>
                <p className="text-sm text-slate-600">Years Experience</p>
              </div>
              <div className="rounded-xl bg-secondary/10 px-5 py-3">
                <p className="text-2xl font-bold text-secondary">500+</p>
                <p className="text-sm text-slate-600">Happy Clients</p>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-6 inline-block font-semibold text-primary hover:underline"
            >
              Learn more about us →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="card-hover rounded-2xl border border-slate-100 bg-slate-50 p-6"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
