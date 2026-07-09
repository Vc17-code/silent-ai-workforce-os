import Link from "next/link";
import Image from "next/image";
import OwnerSidebar from "@/components/OwnerSidebar";
import { getProperties } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from "@/types/property";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import ListingActions from "@/components/ListingActions";

export default async function OwnerListingsPage() {
  const properties = await getProperties(true);

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Property Listings</h1>
            <p className="text-slate-500">{properties.length} total properties</p>
          </div>
          <Link
            href="/owner/listings/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Property</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Price</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Flags</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={property.images[0] || "https://placehold.co/64x48"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{property.title}</p>
                          <p className="text-xs text-slate-500">{property.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {PROPERTY_TYPE_LABELS[property.propertyType]}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {formatPrice(property.price, property.status)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium">
                        {PROPERTY_STATUS_LABELS[property.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {property.featured && (
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">★</span>
                        )}
                        {property.hidden ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/properties/${property.slug}`}
                          target="_blank"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                          title="View on site"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/owner/listings/${property.id}/edit`}
                          className="rounded-lg p-2 text-primary hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <ListingActions propertyId={property.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {properties.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No properties yet.{" "}
              <Link href="/owner/listings/new" className="text-primary hover:underline">
                Add your first property
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
