import OwnerSidebar from "@/components/OwnerSidebar";
import JsonEditor from "@/components/owner/JsonEditor";
import { getOffers } from "@/lib/db";

export default async function OwnerOffersPage() {
  const offers = await getOffers();
  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <h1 className="font-display text-3xl text-ink">Offers</h1>
        <p className="mt-1 text-muted">Manage active promotions and welcome offers.</p>
        <div className="mt-8">
          <JsonEditor type="offers" initial={offers} />
        </div>
      </div>
    </>
  );
}
