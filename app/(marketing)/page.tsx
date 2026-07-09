import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyCategories from "@/components/PropertyCategories";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CTA from "@/components/CTA";
import { getFeaturedProperties } from "@/lib/db";

export default async function HomePage() {
  const featured = await getFeaturedProperties();

  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProperties properties={featured} />
      <PropertyCategories />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <CTA />
    </>
  );
}
