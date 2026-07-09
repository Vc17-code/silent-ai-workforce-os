import { PageHero } from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";
import { contactInfo } from "@/lib/config";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about Disha Properties — Ajmer's trusted real estate experts with 16+ years of experience in residential and commercial properties.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Disha Properties"
        subtitle={`Your trusted property partner in Ajmer since 2009. ${contactInfo.experienceYears}+ years of local expertise.`}
      />
      <AboutSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <CTA />
    </>
  );
}
