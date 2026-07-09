import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-background" id="testimonials">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Client Stories
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Customer Testimonials
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
