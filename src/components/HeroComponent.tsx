import React from "react";
import TiltedSolarSystem from "./ThreeDSolarSystem";

const HeroComponent = () => {
  return (
    <section className="relative mt-20 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Background Solar System (for mobile) */}
      <div className="absolute inset-0 z-0 md:hidden">
        <TiltedSolarSystem />
        <div className="absolute inset-0 bg-gradient-to-b " />
      </div>

      {/* Left (Text Content) */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 text-center md:text-left text-white space-y-3 md:space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-widest">
          DJS NOVA
        </h1>
        <div className="text-xl md:text-2xl leading-relaxed">
          <span className="block">The official</span>
          <span className="block">Astronomy</span>
          <span className="block">and Astrophysics</span>
          <span className="block">club of DJSCE.</span>
        </div>

        {/* Optional glowing line accent */}
        
      </div>

      {/* Right (Solar System for Desktop) */}
      <div className="hidden md:block relative w-1/2 h-[calc(100vh-80px)]">
        <TiltedSolarSystem />
      </div>
    </section>
  );
};

export default HeroComponent;


// const HeroComponent = () => {
//   return (
// <div className="relative h-screen flex tracking-[0.25em] bg-[url('/bg/earth_bg.png')] bg-cover bg-center flex-col items-center justify-center">
//   {/* Text content */}
//   <h1 className="text-8xl text-white">DJS NOVA</h1>
//   <h3 className="text-4xl mb-[250px] text-white">
//     The Official Astronomy & Astrophysics Club, DJSCE
//   </h3>

//   {/* Bottom blending overlay */}
//   <div className="absolute -bottom-10 left-0 w-full h-[200px] bg-gradient-to-t from-black/80 via-black/60 to-transparent blur-md"></div>
// </div>

//   );
// };

