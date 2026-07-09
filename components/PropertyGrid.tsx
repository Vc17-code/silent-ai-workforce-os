import PropertyCard from "./PropertyCard";
import type { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
  emptyMessage?: string;
}

export default function PropertyGrid({
  properties,
  emptyMessage = "No properties found.",
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <p className="text-lg text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} featured={property.featured} />
      ))}
    </div>
  );
}
