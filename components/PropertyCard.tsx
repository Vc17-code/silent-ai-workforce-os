import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, MapPin, Phone, MessageCircle, Maximize } from "lucide-react";
import type { Property } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import { formatPrice, formatArea, getPhoneLink, getWhatsAppLink } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured }: PropertyCardProps) {
  const image = property.images[0] || "https://placehold.co/600x400/1E3A8A/FFFFFF?text=Property";
  const whatsappMsg = `Hi, I'm interested in ${property.title} listed on Disha Properties.`;

  return (
    <article className="card-hover group overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          {PROPERTY_TYPE_LABELS[property.propertyType]}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{property.title}</h3>
          <p className="shrink-0 text-lg font-bold text-primary">
            {formatPrice(property.price, property.status)}
          </p>
        </div>

        <p className="mb-3 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>

        <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            {formatArea(property.area, property.areaUnit)}
          </span>
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathrooms} Bath
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            View Details
          </Link>
          <a
            href={getPhoneLink(property.contactNumber)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-primary transition-colors hover:bg-slate-50"
            aria-label="Call about this property"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={getWhatsAppLink(property.contactNumber.replace(/\D/g, ""), whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-secondary transition-colors hover:bg-emerald-50"
            aria-label="WhatsApp about this property"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
