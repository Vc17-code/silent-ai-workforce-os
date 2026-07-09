import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyGrid from "./PropertyGrid";
import type { Property } from "@/types/property";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
    <section className="section-padding bg-background" id="properties">
      <div className="container-custom">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Featured Listings
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Handpicked premium properties in Ajmer — verified, transparent, and ready for you.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
          >
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
}
