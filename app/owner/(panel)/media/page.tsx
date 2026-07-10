import OwnerSidebar from "@/components/OwnerSidebar";
import MediaManager from "@/components/owner/MediaManager";
import { getMediaAssets } from "@/lib/db";

export default async function OwnerMediaPage() {
  const media = await getMediaAssets();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Video & 360° Tour</h1>
        <p className="mt-1 text-muted">
          Add introductory video and virtual tour embed URLs when assets are ready — no code changes needed.
        </p>
        <div className="mt-8">
          <MediaManager initial={media} />
        </div>
      </div>
    </>
  );
}
