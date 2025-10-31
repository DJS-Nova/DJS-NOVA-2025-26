// "use client";
// import { useEffect, useState } from "react";

// const IntroOverlay = () => {
//   const [mounted, setMounted] = useState(false);
//   const [fade, setFade] = useState(false);
//   const [show, setShow] = useState(true);
//   const [typed, setTyped] = useState(false);

//   useEffect(() => {
//     const mountTimer = requestAnimationFrame(() => setMounted(true));

//     let fadeTimer: NodeJS.Timeout;
//     let hideTimer: NodeJS.Timeout;
//     let typedTimer: NodeJS.Timeout;

//     if (mounted) {
//       typedTimer = setTimeout(() => setTyped(true), 2200); // Typing done
//       fadeTimer = setTimeout(() => setFade(true), 2500); // Short pause
//       hideTimer = setTimeout(() => setShow(false), 3000); // Fade out
//     }

//     return () => {
//       cancelAnimationFrame(mountTimer);
//       clearTimeout(fadeTimer);
//       clearTimeout(hideTimer);
//       clearTimeout(typedTimer);
//     };
//   }, [mounted]);

//   if (!show) return null;

//   return (
//     <div className={`overlay ${fade ? "fade-out" : ""}`}>
//       <div className={`typewriter ${mounted ? "start" : ""}`}>
//         <h1 className={typed ? "typed" : ""}>Chaos in calm....</h1>
//       </div>
//     </div>
//   );
// };

// export default IntroOverlay;


"use client";

import { useEffect, useState } from "react";

const IntroOverlay = () => {
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(true);
  const text = "Chaos in calm....";

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 2700);
    const hideTimer = setTimeout(() => setShow(false), 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.6s ease;
        }
        .overlay.fade-out {
          opacity: 0;
        }

        .fade-in-text {
          display: inline-block;
          color: white;
          font-size: 2rem;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .fade-in-char {
          opacity: 0;
          transform: translateY(10px);
          display: inline-block;
          animation: fadeInUp 0.05s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={`overlay ${fade ? "fade-out" : ""}`}>
        <div className="fade-in-text">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="fade-in-char"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default IntroOverlay;
