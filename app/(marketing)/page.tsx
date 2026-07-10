import Hero from "@/components/Hero";
import IntroSection, {
  DoctorHighlight,
  WhyChooseUs,
} from "@/components/IntroSection";
import FeaturedTreatments from "@/components/FeaturedTreatments";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  GalleryPreview,
  IntroVideoSection,
  VirtualTourPreview,
} from "@/components/MediaSections";
import AppointmentCTA, { LocationSection } from "@/components/AppointmentCTA";
import {
  getFeaturedTreatments,
  getGallery,
  getMediaAssets,
  getSiteContent,
  getTestimonials,
} from "@/lib/db";

export default async function HomePage() {
  const [treatments, testimonials, gallery, media, content] = await Promise.all([
    getFeaturedTreatments(),
    getTestimonials(),
    getGallery(),
    getMediaAssets(),
    getSiteContent(),
  ]);

  return (
    <>
      <Hero media={media} />
      <IntroSection content={content} />
      <DoctorHighlight />
      <WhyChooseUs items={content.whyChooseUs} />
      <FeaturedTreatments treatments={treatments} />
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPreview items={gallery} />
      <VirtualTourPreview media={media} />
      <IntroVideoSection media={media} />
      <AppointmentCTA />
      <LocationSection />
    </>
  );
}
