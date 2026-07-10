import OwnerSidebar from "@/components/OwnerSidebar";
import AppointmentsManager from "@/components/owner/AppointmentsManager";
import { getAppointments } from "@/lib/db";

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Appointments</h1>
        <p className="mt-1 text-muted">Incoming booking requests from the website.</p>
        <div className="mt-8">
          <AppointmentsManager initial={appointments} />
        </div>
      </div>
    </>
  );
}
