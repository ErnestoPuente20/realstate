import BrandsSection from "@/components/sections/BrandsSection";
import Hero from "@/components/sections/Hero";
import PropertiesSection from "@/components/sections/PropertiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero/>
      <PropertiesSection/>
      <BrandsSection/>
      <TestimonialsSection/>
    </>
  );
}
