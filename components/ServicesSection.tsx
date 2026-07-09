import { services } from "@/lib/utils";

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background" id="services">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            What We Offer
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            End-to-end real estate solutions for buyers, sellers, and investors in Ajmer.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-hover rounded-2xl bg-white p-6 shadow-sm"
            >
              <span className="text-3xl">{service.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
