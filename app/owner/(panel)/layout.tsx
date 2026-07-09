import { redirect } from "next/navigation";
import { isOwnerAuthenticated } from "@/lib/auth";

export default async function OwnerPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isOwnerAuthenticated();

  if (!authenticated) {
    redirect("/owner/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
