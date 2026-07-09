import { PageHero } from "@/components/Hero";
import ContactSection from "@/components/ContactSection";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact",
  description:
    "Contact Disha Properties in Makarwali, Ajmer. Call +91 9414435920 or send an inquiry for property buying, selling, and rentals.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch for property inquiries, site visits, or consultation. We're here to help."
      />
      <ContactSection />
    </>
  );
}
