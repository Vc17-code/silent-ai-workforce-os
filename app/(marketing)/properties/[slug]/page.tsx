import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, MapPin, Phone, MessageCircle, Maximize, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PropertyCard from "@/components/PropertyCard";
import { getPropertyBySlug, getProperties } from "@/lib/db";
import { generateSEO, propertyJsonLd } from "@/lib/seo";
import { formatPrice, formatArea, getPhoneLink, getWhatsAppLink } from "@/lib/utils";
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from "@/types/property";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const properties = await getProperties(true);
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return generateSEO({
    title: property.title,
    description: property.description.slice(0, 160),
    path: `/properties/${property.slug}`,
    image: property.images[0],
  });
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || property.hidden) notFound();

  const allProperties = await getProperties();
  const related = allProperties
    .filter((p) => p.id !== property.id && p.propertyType === property.propertyType)
    .slice(0, 3);

  const whatsappMsg = `Hi, I'm interested in ${property.title} listed on Disha Properties.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertyJsonLd(property)),
        }}
      />

      <section className="bg-slate-900">
        <div className="container-custom py-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>
        <div className="relative aspect-[21/9] max-h-[500px] w-full">
          <Image
            src={property.images[0] || "https://placehold.co/1200x500"}
            alt={property.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container-custom">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
                  {PROPERTY_STATUS_LABELS[property.status]}
                </span>
                {property.featured && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">{property.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-white/90">
                <MapPin className="h-5 w-5" />
                {property.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {property.images.length > 1 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {property.images.map((img, i) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={img}
                        alt={`${property.title} - Image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}

              {property.videoUrl && (
                <div className="overflow-hidden rounded-2xl bg-black">
                  <video src={property.videoUrl} controls className="w-full" />
                </div>
              )}

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Description</h2>
                <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.amenities.length > 0 && (
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900">Amenities & Features</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {property.mapEmbedUrl && (
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <iframe
                    src={property.mapEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${property.title}`}
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md">
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(property.price, property.status)}
                </p>
                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Area</span>
                    <span className="font-medium">{formatArea(property.area, property.areaUnit)}</span>
                  </div>
                  {property.bedrooms != null && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bedrooms</span>
                      <span className="font-medium flex items-center gap-1">
                        <Bed className="h-4 w-4" /> {property.bedrooms} BHK
                      </span>
                    </div>
                  )}
                  {property.bathrooms != null && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bathrooms</span>
                      <span className="font-medium flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {property.bathrooms}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type</span>
                    <span className="font-medium">{PROPERTY_TYPE_LABELS[property.propertyType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Address</span>
                    <span className="font-medium text-right max-w-[60%]">{property.address}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <a
                    href={getPhoneLink(property.contactNumber)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    <Phone className="h-4 w-4" />
                    Call Owner
                  </a>
                  <a
                    href={getWhatsAppLink(property.contactNumber.replace(/\D/g, ""), whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-semibold text-white hover:bg-emerald-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-bold">Send Inquiry</h3>
                <ContactForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  compact
                />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-8 text-2xl font-bold text-slate-900">Related Properties</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
