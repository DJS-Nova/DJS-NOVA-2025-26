// import React from "react";
// import RotatableSphere from "./RotatingSphere";

// const OurMisson = () => {
//   return (
//     <div className=" flex min-h-[400px] justify-between items-center gap-10">
//       <div className="w-1/4 h-[400px] relative flex justify-between items-center">
//           {/* <RotatableSphere
//             textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
//             bumpMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
//             specularMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
//             width={350}
//             height={350}
//           /> */}
//       </div>
//       <div className="w-3/4 ">
//         <h3 className="text-4xl font-bold tracking-wide mb-3">Our Misson</h3>
//         <p className="text-[20px] w-[800px]">
//           The mission of DJS NOVA, the official Astronomy and Astrophysics Club
//           of DJSCE, is to promote scientific curiosity and awareness in the
//           field of space science. We endeavor to provide students with
//           opportunities to learn, observe, and research various aspects of
//           astronomy and astrophysics. By organizing talks, observations, and
//           educational initiatives, we aim to inspire the next generation of
//           thinkers and innovators to look beyond the horizon and reach for the
//           stars.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OurMisson;


import React from "react";
import RotatableSphere from "./RotatingSphere";

const OurMission = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16 min-h-[400px] px-6 md:px-12 py-10">
      {/* ==== Left: 3D Sphere / Image ==== */}
      <div className="w-full md:w-1/3 h-[300px] md:h-[400px] relative flex justify-center items-center">
        {/* Uncomment if using the 3D sphere */}
        <RotatableSphere
          textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
          bumpMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
          specularMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
          width={250}
          height={250}
        />

        {/* Fallback placeholder for mobile if sphere disabled */}
        {/* <div className="w-64 h-64 bg-gradient-to-tr from-blue-900 to-purple-700 rounded-full shadow-2xl md:hidden" /> */}
      </div>

      {/* ==== Right: Text Section ==== */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-bold tracking-wide mb-4 text-white">
          Our Mission
        </h3>
        <p className=" text-gray-300 tracking-[0.1em] space-y-4
            text-sm sm:text-base md:text-lg
            leading-relaxed w-full md:w-3/4 mx-auto md:mx-0">
          The mission of <span className="text-amber-400 font-semibold">DJS NOVA</span>,
          the official Astronomy and Astrophysics Club of DJSCE, is to promote
          scientific curiosity and awareness in the field of space science. We
          endeavor to provide students with opportunities to learn, observe, and
          research various aspects of astronomy and astrophysics. By organizing
          talks, observations, and educational initiatives, we aim to inspire
          the next generation of thinkers and innovators to look beyond the
          horizon and reach for the stars.
        </p>
      </div>
    </section>
  );
};

export default OurMission;

