import { PageHero } from "@/components/Hero";
import PropertyGallery from "@/components/PropertyGallery";
import { getProperties } from "@/lib/db";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Gallery",
  description:
    "Browse our property gallery featuring residential, commercial, plots, and rental properties in Ajmer.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const properties = await getProperties();

  return (
    <>
      <PageHero
        title="Property Gallery"
        subtitle="Explore our collection of residential, commercial, and plot properties across Ajmer."
      />
      <section className="section-padding bg-background">
        <div className="container-custom">
          <PropertyGallery properties={properties} />
        </div>
      </section>
    </>
  );
}
