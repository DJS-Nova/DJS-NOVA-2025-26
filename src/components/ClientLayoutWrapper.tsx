"use client";

import { useEffect, useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FallingStars from "@/components/FallingStars";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Always show intro when the page loads
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[url('/bg/space_bg.gif')] bg-auto bg-repeat bg-left-top overflow-hidden">
      <FallingStars />
      {showIntro && <IntroOverlay />}
      <Navbar />
      <div className="mt-[56px]">{children}</div>
      <Footer />
    </div>
  );
}
