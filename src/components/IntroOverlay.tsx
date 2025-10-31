"use client";
import { useEffect, useState } from "react";

const IntroOverlay = () => {
  const [mounted, setMounted] = useState(false);
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Wait until hydration & first paint
    const mountTimer = requestAnimationFrame(() => setMounted(true));

    let fadeTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (mounted) {
      // Start fade and hide timers *after* mount
      fadeTimer = setTimeout(() => setFade(true), 2200); // typing (2s) + pause
      hideTimer = setTimeout(() => setShow(false), 2700); // fade (0.5s)
    }

    return () => {
      cancelAnimationFrame(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [mounted]);

  if (!show) return null;

  return (
    <div className={`overlay ${fade ? "fade-out" : ""}`}>
      <div className={`typewriter ${mounted ? "start" : ""}`}>
        <h1>Chaos in calm....</h1>
      </div>
    </div>
  );
};

export default IntroOverlay;
