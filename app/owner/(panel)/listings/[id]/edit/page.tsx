import { notFound } from "next/navigation";
import OwnerSidebar from "@/components/OwnerSidebar";
import PropertyForm from "@/components/PropertyForm";
import { getPropertyById } from "@/lib/db";

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Property</h1>
        <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <PropertyForm property={property} />
        </div>
      </div>
    </>
  );
}
