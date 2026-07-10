import OwnerSidebar from "@/components/OwnerSidebar";
import JsonEditor from "@/components/owner/JsonEditor";
import { getSiteContent } from "@/lib/db";

export default async function OwnerSettingsPage() {
  const content = await getSiteContent();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">SEO & content</h1>
        <p className="mt-1 text-muted">
          Edit about copy, why-choose-us points, and default SEO metadata.
        </p>
        <div className="mt-8">
          <JsonEditor type="content" initial={content} />
        </div>
      </div>
    </>
  );
}
