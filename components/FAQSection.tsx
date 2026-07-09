import FAQ from "./FAQ";
import { faqs } from "@/lib/utils";
import { faqJsonLd } from "@/lib/seo";

export default function FAQSection() {
  return (
    <section className="section-padding bg-white" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Got Questions?
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <FAQ items={faqs} />
        </div>
      </div>
    </section>
  );
}
