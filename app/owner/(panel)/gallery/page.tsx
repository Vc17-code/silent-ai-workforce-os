import OwnerSidebar from "@/components/OwnerSidebar";
import GalleryManager from "@/components/owner/GalleryManager";
import { getGallery } from "@/lib/db";

export default async function OwnerGalleryPage() {
  const items = await getGallery();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Gallery</h1>
        <p className="mt-1 text-muted">
          Upload before/after smiles and clinic photos via image URLs (or file upload API).
        </p>
        <div className="mt-8">
          <GalleryManager initial={items} />
        </div>
      </div>
    </>
  );
}
