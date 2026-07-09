import OwnerSidebar from "@/components/OwnerSidebar";
import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Add New Property</h1>
        <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <PropertyForm />
        </div>
      </div>
    </>
  );
}
