import React from "react";
import TiltedSolarSystem from "./ThreeDSolarSystem";

const HeroComponent = () => {
  return (
    <section className="relative mt-20 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between overflow-hidden px-6 md:px-12 lg:px-20 py-16 md:py-0">
      {/* Background Solar System (for mobile) */}
      <div className="absolute inset-0 z-0 md:hidden">
        <TiltedSolarSystem />
        <div className="absolute inset-0 bg-gradient-to-b " />
      </div>

      {/* Left (Text Content) */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 text-center md:text-left text-white space-y-3 md:space-y-4 mt-30 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-bold tracking-widest">
          DJS NOVA
        </h1>
        <div className="hidden md:block text-xl md:text-4xl uppercase  tracking-wider">
          <span className="block">The official </span>
          <span className="block">Astronomy and Astrophysics</span>
          <span className="block">club of DJSCE.</span>
        </div>

        <p className="hidden md:block text-gray-400 tracking-widest uppercase text-md ">We aim to spark fascination with the mysteries of the universe, bringing together students who share a passion for exploring the stars, space science, and cosmic discoveries</p>

        <p className=" md:hidden block text-gray-400 tracking-widest uppercase text-sm">
          The official Astronomy and Astrophysics club of DJSCE.
        </p>

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



// import React from "react";
// import TiltedSolarSystem from "./ThreeDSolarSystem";

// const HeroComponent = () => {
//   return (
//     <section className="relative mt-20 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between overflow-hidden">
//       {/* Background Solar System (for mobile) */}
//       <div className="absolute inset-0 z-0 md:hidden">
//         <TiltedSolarSystem />
//         <div className="absolute inset-0 bg-gradient-to-b " />
//       </div>

//       {/* Left (Text Content) */}
//       <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 text-center md:text-left text-white space-y-3 md:space-y-4 mt-30 md:mt-0">
//         {/* Desktop: Enhanced with glow and backdrop */}
//         <div className="hidden md:block">
//           <h1 className="text-6xl lg:text-7xl font-bold tracking-widest mb-8 relative">
//             <span className="relative inline-block">
//               DJS NOVA
//               <span className="absolute inset-0 blur-2xl opacity-50 text-blue-400">DJS NOVA</span>
//             </span>
//           </h1>
          
//           <div className="text-2xl lg:text-3xl leading-relaxed space-y-2 backdrop-blur-sm bg-black/20 p-6 rounded-lg border border-white/10">
//             <span className="block text-gray-300">The official</span>
//             <span className="block text-blue-300 font-semibold">Astronomy</span>
//             <span className="block text-gray-300">and</span>
//             <span className="block text-blue-300 font-semibold">Astrophysics</span>
//             <span className="block text-gray-300">club of DJSCE.</span>
//           </div>

//           {/* Decorative elements */}
//           <div className="mt-8 flex items-center gap-4">
//             <div className="h-px w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
//             <div className="flex gap-2">
//               <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
//               <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse delay-75"></div>
//               <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-150"></div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile: Keep original styling */}
//         <h1 className="md:hidden text-5xl font-bold tracking-widest">
//           DJS NOVA
//         </h1>
//         <p className="md:hidden block text-gray-400 tracking-widest uppercase text-sm">
//           The official Astronomy and Astrophysics club of DJSCE.
//         </p>
//       </div>

//       {/* Right (Solar System for Desktop) */}
//       <div className="hidden md:block relative w-1/2 h-[calc(100vh-80px)]">
//         <TiltedSolarSystem />
//         {/* Optional overlay gradient to blend better */}
//         <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/30 pointer-events-none"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroComponent;