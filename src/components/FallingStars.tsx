"use client";

import { useState, useEffect } from "react";

const FallingStars = () => {
  const shootingStarInterval = 8000;

  const [shootingStars, setShootingStars] = useState<
    { top: string; right: string; id: number }[]
  >([]);

  useEffect(() => {
    // Generate static stars

    // Create shooting star
    const createShootingStar = () => {
      const newShootingStar = {
        top: `${Math.random() * 100}%`,
        right: `${Math.random() * 100}%`,
        id: Date.now(),
      };

      setShootingStars((prev) => [...prev, newShootingStar]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, 3000);
    };

    // Recursive interval
    const randomizeShootingStarInterval = () => {
      const interval = Math.random() * shootingStarInterval;
      const timeout = setTimeout(() => {
        createShootingStar();
        randomizeShootingStarInterval();
      }, interval);

      return timeout;
    };

    const timeoutId = randomizeShootingStarInterval();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      id="stars"
      className="fixed inset-0 overflow-hidden z-10 stars-container pointer-events-none"
    >

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            right: star.right,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FallingStars;