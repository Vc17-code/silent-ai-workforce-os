import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  subtitle?: string;
}

export default function CTA({
  title = "Ready to Find Your Perfect Property?",
  subtitle = "Contact Disha Properties today for expert guidance on buying, selling, or renting in Ajmer.",
}: CTAProps) {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-blue-50"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
