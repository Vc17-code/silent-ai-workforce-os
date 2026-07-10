import OwnerSidebar from "@/components/OwnerSidebar";
import { getDashboardStats } from "@/lib/db";
import { Calendar, Stethoscope, Images, MessageSquareQuote } from "lucide-react";
import Link from "next/link";

export default async function OwnerDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "New appointments",
      value: stats.newAppointments,
      icon: Calendar,
      href: "/owner/appointments",
    },
    {
      label: "Treatments",
      value: stats.totalTreatments,
      icon: Stethoscope,
      href: "/owner/treatments",
    },
    {
      label: "Gallery items",
      value: stats.galleryItems,
      icon: Images,
      href: "/owner/gallery",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      href: "/owner/testimonials",
    },
  ];

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Dashboard</h1>
        <p className="mt-1 text-muted">
          Manage Smilecare content, appointments, and media — no coding required.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="rounded-2xl border border-primary/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,92,92,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted">{card.label}</p>
                    <p className="mt-1 font-display text-3xl text-ink">{card.value}</p>
                  </div>
                  <div className="rounded-2xl bg-mist p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h2 className="font-display text-xl">Quick actions</h2>
            <div className="mt-4 grid gap-2">
              <Link href="/owner/appointments" className="btn-primary justify-center">
                Review appointments ({stats.unreadAppointments} unread)
              </Link>
              <Link href="/owner/media" className="btn-secondary justify-center">
                Update video & 360° tour
              </Link>
              <Link href="/owner/gallery" className="btn-secondary justify-center">
                Manage smile gallery
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h2 className="font-display text-xl">Future-ready modules</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Patient portal · Teleconsultation · Digital prescriptions</li>
              <li>Online payments · AI chatbot · Smile simulator</li>
              <li>Multi-branch · CRM · Analytics dashboard</li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              Architecture supports these without redesign — activate when ready.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
