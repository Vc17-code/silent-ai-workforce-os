"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { PropertyType } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/types/property";

interface PropertiesFilterProps {
  currentType?: PropertyType;
  currentStatus?: string;
}

export default function PropertiesFilter({
  currentType,
  currentStatus,
}: PropertiesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentType || ""}
        onChange={(e) => updateFilter("type", e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Filter by property type"
      >
        <option value="">All Types</option>
        {Object.entries(PROPERTY_TYPE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={currentStatus || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Filter by status"
      >
        <option value="">All Status</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>

      {(currentType || currentStatus) && (
        <button
          type="button"
          onClick={() => router.push("/properties")}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
