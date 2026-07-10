import OwnerSidebar from "@/components/OwnerSidebar";
import TreatmentsManager from "@/components/owner/TreatmentsManager";
import { getTreatments } from "@/lib/db";

export default async function OwnerTreatmentsPage() {
  const treatments = await getTreatments(true);

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Treatments</h1>
        <p className="mt-1 text-muted">
          Edit titles, descriptions, and featured status. Full clinical copy can be refined anytime.
        </p>
        <div className="mt-8">
          <TreatmentsManager initial={treatments} />
        </div>
      </div>
    </>
  );
}
