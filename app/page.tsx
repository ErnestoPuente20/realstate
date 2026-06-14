import BrandsSection from "@/components/sections/BrandsSection";
import FaqSection from "@/components/sections/FaqSection";
import Hero from "@/components/sections/Hero";
import PropertiesSection from "@/components/sections/PropertiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Hero/>
      <PropertiesSection/>
      <BrandsSection/>
      <TestimonialsSection/>
      <FaqSection/>
    </>
  );
}
