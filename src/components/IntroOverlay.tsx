"use client";

import { useEffect, useState } from "react";

const IntroOverlay = () => {
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start fade-out after typing completes
    const fadeTimer = setTimeout(() => setFade(true), 2200); // typing (2s) + small pause
    const hideTimer = setTimeout(() => setShow(false), 2100); // fade lasts 0.5s
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`overlay ${fade ? "fade-out" : ""}`}>
      <div className="typewriter">
        <h1>Chaos in calm....</h1>
      </div>
    </div>
  );
};

export default IntroOverlay;
