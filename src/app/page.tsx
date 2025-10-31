"use client";
import AboutUs from "@/components/AboutUs";
import AstrophotographySection from "@/components/AstrophotographySection";
import Carousel from "@/components/Carousel";
import HeroComponent from "@/components/HeroComponent";
import MagazineSection from "@/components/MagazineSection";
import OurMisson from "@/components/OurMisson";
import useScrollCompensate from "@/components/useScrollCompensate";

export default function Home() {
  const media = [
    { type: "image", src: "/astro1.png", alt: "First" },
    { type: "image", src: "astro2.png", alt: "Second" },
    { type: "video", src: "/event/stargazing.mp4", alt: "Video First" },
    { type: "image", src: "astro3.png", alt: "Third" },
  ];

  useScrollCompensate()


  return (
    <>
      <HeroComponent />
      <AboutUs />
      <OurMisson />
      <Carousel items={media} />
      <MagazineSection />
    </>
  );
}
