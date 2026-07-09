import { whyChooseUs } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Why Disha Properties
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              With over 16 years of experience in the Ajmer real estate market, we combine local expertise with transparent dealings to help you make the right property decisions.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="font-medium text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
