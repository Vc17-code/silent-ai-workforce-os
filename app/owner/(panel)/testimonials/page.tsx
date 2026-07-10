import OwnerSidebar from "@/components/OwnerSidebar";
import TestimonialsManager from "@/components/owner/TestimonialsManager";
import { getTestimonials } from "@/lib/db";

export default async function OwnerTestimonialsPage() {
  const items = await getTestimonials();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Testimonials</h1>
        <p className="mt-1 text-muted">Manage patient stories and optional video testimonial links.</p>
        <div className="mt-8">
          <TestimonialsManager initial={items} />
        </div>
      </div>
    </>
  );
}
