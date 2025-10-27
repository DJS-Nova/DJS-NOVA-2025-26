import AboutUs from "@/components/AboutUs";
import AstrophotographySection from "@/components/AstrophotographySection";
import Carousel from "@/components/Carousel";
import HeroComponent from "@/components/HeroComponent";
import MagazineSection from "@/components/MagazineSection";
import OurMisson from "@/components/OurMisson";

export default function Home() {
  const media = [
    { type: "image", src: "/astro1.png", alt: "First" },
    { type: "image", src: "astro2.png", alt: "Second" },
    { type: "video", src: "/event/stargazing.mp4", alt: "Video First" },
    { type: "image", src: "astro3.png", alt: "Third" },
  ];

  return (
    <>
      <div
        className="
    h-[130px] w-[130px] -right-10 top-[194vh] md:h-[350px] md:w-[150px]
    bg-[url('/images/astriod.png')]
    bg-contain bg-center bg-no-repeat
    absolute md:top-[200vh] md:right-0 z-50 -translate-y-1/2
  "
      />

      <HeroComponent />
      <AboutUs />
      <OurMisson />
      <Carousel items={media} />
      <MagazineSection />
    </>
  );
}
