import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Technology } from "@/components/home/Technology";
import { Doctor } from "@/components/home/Doctor";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { Testimonials } from "@/components/home/Testimonials";
import { SmileGallery } from "@/components/home/SmileGallery";
import { Insurance } from "@/components/home/Insurance";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedServices />
      <Technology />
      <Doctor />
      <ServiceIndex />
      <Testimonials />
      <SmileGallery />
      <Insurance />
      <ClosingCta />
    </>
  );
}
