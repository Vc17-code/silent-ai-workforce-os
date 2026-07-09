import { PageHero } from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";
import { services } from "@/lib/utils";

export const metadata = generateSEO({
  title: "Services",
  description:
    "Property buying, selling, rental assistance, investment advice, documentation, and home loan support in Ajmer.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Complete real estate solutions for buyers, sellers, renters, and investors in Ajmer."
      />
      <ServicesSection />
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
            Everything You Need, Under One Roof
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex gap-4 rounded-xl border border-slate-100 p-5"
              >
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-1 text-slate-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessTimeline />
      <CTA />
    </>
  );
}
