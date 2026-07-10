import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import EmergencyBanner from "@/components/EmergencyBanner";
import BookingModal from "@/components/BookingModal";
import ExitIntentPrompt from "@/components/ExitIntentPrompt";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmergencyBanner />
      <Navbar />
      <main className="pb-[5.5rem] md:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
      <BookingModal />
      <ExitIntentPrompt />
    </>
  );
}
