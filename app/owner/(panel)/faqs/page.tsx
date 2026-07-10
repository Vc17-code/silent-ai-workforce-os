import OwnerSidebar from "@/components/OwnerSidebar";
import JsonEditor from "@/components/owner/JsonEditor";
import { getFaqs } from "@/lib/db";

export default async function OwnerFaqsPage() {
  const faqs = await getFaqs();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">FAQs</h1>
        <p className="mt-1 text-muted">Edit frequently asked questions shown across the site.</p>
        <div className="mt-8">
          <JsonEditor type="faqs" initial={faqs} />
        </div>
      </div>
    </>
  );
}
