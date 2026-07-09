import { Suspense } from "react";
import { PageHero } from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import PropertiesFilter from "@/components/PropertiesFilter";
import { getProperties } from "@/lib/db";
import { generateSEO } from "@/lib/seo";
import type { PropertyType } from "@/types/property";

export const metadata = generateSEO({
  title: "Properties",
  description:
    "Browse verified residential, commercial, and plot listings in Ajmer. Find your perfect property with Disha Properties.",
  path: "/properties",
});

interface PropertiesPageProps {
  searchParams: Promise<{ type?: string; status?: string }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  let properties = await getProperties();

  if (params.type) {
    properties = properties.filter((p) => p.propertyType === params.type);
  }
  if (params.status === "rent") {
    properties = properties.filter((p) => p.status === "rent");
  } else if (params.status === "sale") {
    properties = properties.filter((p) => p.status === "sale");
  }

  return (
    <>
      <PageHero
        title="Our Properties"
        subtitle="Explore verified residential, commercial, and plot listings across Ajmer."
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <Suspense fallback={null}>
            <PropertiesFilter
              currentType={params.type as PropertyType | undefined}
              currentStatus={params.status}
            />
          </Suspense>
          <div className="mt-8">
            <PropertyGrid
              properties={properties}
              emptyMessage="No properties match your filters. Contact us for custom requirements."
            />
          </div>
        </div>
      </section>
    </>
  );
}
