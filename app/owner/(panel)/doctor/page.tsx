import OwnerSidebar from "@/components/OwnerSidebar";
import JsonEditor from "@/components/owner/JsonEditor";
import { getDoctor } from "@/lib/db";

export default async function OwnerDoctorPage() {
  const doctor = await getDoctor();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Doctor profile</h1>
        <p className="mt-1 text-muted">Update biography, credentials, and gallery.</p>
        <div className="mt-8">
          <JsonEditor type="doctor" initial={doctor} />
        </div>
      </div>
    </>
  );
}
