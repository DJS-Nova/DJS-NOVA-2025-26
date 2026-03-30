/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  X,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  BookOpen,
  Award,
  Star
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface AchievementImage {
  url: string;
  alt: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  gallery: AchievementImage[];
  externalLink?: string;
}

const RESEARCH_PAPER: Achievement = {
  id: "research",
  title: "Visibility graph approach to characterize planetary transit signatures: A case study on OGLE IV data",
  description: "Written by Yash Prajapati (Co-com Member, DJS NOVA), under the guidance of Dr. Moses Kartha (DJSCE), and coordinated by Dr. Ankita B. Jain (Faculty Coordinator, DJS NOVA)",
  date: "2025-01-01",
  category: "ScienceDirect",
  coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop", // Space-themed background
  gallery: [],
  externalLink: "https://www.sciencedirect.com/science/article/abs/pii/S138410762600031X"
};

const PROVISIONAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "provisional",
    title: "Provisional Discoveries",
    description: "Official provisional discoveries verified by the National Spaceonova Asteroid Search Campaign.",
    date: "2025-02-15",
    category: "Asteroid Search Campaign",
    coverImage: "/achievements/Provisional%20Discoveries/IMG_4510.jpg",
    gallery: [
      { url: "/achievements/Provisional%20Discoveries/IMG_4510.jpg", alt: "Certificate 1" },
      { url: "/achievements/Provisional%20Discoveries/IMG_4511.jpg", alt: "Certificate 2" }
    ]
  },
  {
    id: "iaac",
    title: "IAAC Awards",
    description: "Congratulations to all the winners! Here are the names from the IAAC Awards lists, organized by their respective honours:\n\nGold Honour:\nMohit Shah, Rishiraj Joisher, Akshat Singh, Laxmi Prajapati, Jainam Dedhia, Shiva Sukumar\n\nSilver Honour:\nRonak Shah, Srushti Joshi, Mahek Shah, Mishri Parekh, Bansi Sampat, Shrawani Jagtap, Krishi Nisar",
    date: "2025-03-29",
    category: "International Competition",
    coverImage: "/achievements/Iaac/Jainam%20Dedhia.jpeg",
    gallery: [
      { url: "/achievements/Iaac/Jainam%20Dedhia.jpeg", alt: "IAAC Certificate" }
    ]
  }
];

const PRELIMINARY_DETECTIONS: AchievementImage[] = [
  { url: "/achievements/Asteroid%20Preliminary%20Detections/IMG_0890.jpg", alt: "Detection 1" },
  { url: "/achievements/Asteroid%20Preliminary%20Detections/IMG_0898.JPG", alt: "Detection 2" },
  { url: "/achievements/Asteroid%20Preliminary%20Detections/IMG_0899.JPG", alt: "Detection 3" },
  { url: "/achievements/Asteroid%20Preliminary%20Detections/IMG_0900.JPG", alt: "Detection 4" },
  { url: "/achievements/Asteroid%20Preliminary%20Detections/IMG_0901.JPG", alt: "Detection 5" }
];

// --- Full Screen Lightbox ---
const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: {
  images: AchievementImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) => {
  if (!isOpen) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/95 animate-in fade-in duration-200" onClick={onClose}>
      <button onClick={onClose} className="absolute top-16 right-4 md:top-8 md:right-8 text-white/50 hover:text-amber-400 bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all z-20 border border-white/10">
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-amber-400 bg-black/50 hover:bg-black/80 p-3 md:p-4 rounded-full transition-all hover:scale-110 z-20 border border-white/10">
            <ChevronLeft size={24} className="md:w-7 md:h-7" />
          </button>
          <button onClick={handleNext} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-amber-400 bg-black/50 hover:bg-black/80 p-3 md:p-4 rounded-full transition-all hover:scale-110 z-20 border border-white/10">
            <ChevronRight size={24} className="md:w-7 md:h-7" />
          </button>
        </>
      )}

      <div className="relative max-w-7xl h-full w-full px-4 md:px-24 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[85dvh] object-contain rounded-lg"
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/80 rounded-full text-amber-300/80 text-xs md:text-sm tracking-[0.2em] border border-white/10 font-medium z-20">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// --- Split-Screen Achievement Gallery Modal ---
const AchievementGalleryModal = ({ achievement, onClose }: { achievement: Achievement | null; onClose: () => void }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!achievement) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 opacity-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <div className="relative w-full max-w-7xl max-h-[90dvh] md:h-[85vh] bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl md:rounded-4xl shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row border border-white/10 custom-scrollbar mt-10">

          {/* Mobile Close Button */}
          <button onClick={onClose} className="sticky lg:absolute top-4 right-4 ml-auto z-30 p-2.5 bg-black/80 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors lg:hidden flex">
            <X size={20} />
          </button>

          {/* Left Column: Details */}
          <div className="w-full lg:w-[40%] h-auto lg:h-full relative shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 lg:overflow-y-auto hidden-scrollbar bg-white/2">
            <div className="relative h-56 lg:h-80 w-full shrink-0 -mt-12 lg:mt-0">
              <img src={achievement.coverImage} alt={achievement.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            </div>

            <div className="p-6 lg:p-10 relative -mt-16 lg:-mt-20 z-10">
              <span className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4 inline-block">
                Achievement
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">{achievement.title}</h2>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-4 text-white/80 bg-black/40 p-4 rounded-xl md:rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <Award className="text-amber-400 shrink-0" size={18} />
                  <span className="text-sm font-medium tracking-wide">
                    {achievement.category}
                  </span>
                </div>
              </div>

              <div className="prose prose-invert prose-sm md:prose-base text-white/60 leading-relaxed font-light">
                <p className="whitespace-pre-wrap">{achievement.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Masonry Gallery */}
          <div className="w-full lg:w-[60%] h-auto lg:h-full relative bg-black/40 lg:overflow-y-auto custom-scrollbar">
            {/* Desktop Close Button */}
            <button onClick={onClose} className="absolute top-8 right-8 z-20 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors hidden lg:flex">
              <X size={20} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="mb-6 lg:mb-8 mt-2 lg:mt-0">
                <h3 className="text-2xl font-semibold text-white tracking-tight">Gallery & Certificates</h3>
                <p className="text-amber-400/70 text-sm mt-1">{achievement.gallery?.length || 0} moments captured</p>
              </div>

              {achievement.gallery?.length > 0 ? (
                <div className="columns-1 md:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6 pb-4">
                  {achievement.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative group rounded-xl md:rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 break-inside-avoid transform transition-transform duration-300 hover:-translate-y-1"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <img src={img.url} alt={img.alt} className="w-full h-auto object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 drop-shadow-lg" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center border border-dashed border-white/20 rounded-2xl bg-white/5">
                  <p className="text-white/40 text-sm font-medium tracking-wide">No images available for this achievement.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={achievement.gallery}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

// --- Featured Achievement Hero ---
const FeaturedAchievementHero = ({ achievement }: { achievement: Achievement }) => (
  <div className="relative w-full min-h-[600px] md:min-h-[650px] lg:h-[70vh] rounded-4xl overflow-hidden mb-16 md:mb-24 group border border-white/15 flex flex-col shadow-2xl bg-black gap-5">
    {/* Background Image & Overlays (These remain absolute to stay behind the content) */}
    <div className="absolute inset-0 z-0">
      <img src={achievement.coverImage} alt={achievement.title} className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
    </div>
    <div className="absolute inset-0 z-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
    <div className="absolute inset-0 z-0 bg-linear-to-r from-black/80 to-transparent mix-blend-overlay hidden md:block" />

    {/* Featured Badge (Now in normal document flow) */}
    <div className="relative z-20 w-full px-6 md:px-8 lg:px-10 flex justify-start mt-6">
      <div className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,1)]" />
        <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">Featured Research</span>
      </div>
    </div>

    {/* Content (Now in normal document flow with mt-auto pushing it to bottom) */}
    <div className="relative z-10 px-6 md:px-8 lg:px-16 w-full max-w-4xl">
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6 text-white/80 font-medium tracking-wide text-sm md:text-base">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-amber-400" />
          <span>Published in {achievement.category}</span>
        </div>
      </div>

      <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-[1.1]">
        {achievement.title}
      </h2>
      <p className="text-white/70 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl font-light leading-relaxed line-clamp-4 md:line-clamp-none">
        {achievement.description}
      </p>

      {achievement?.externalLink && (
        <Link
          href={achievement.externalLink}
          target="_blank"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-amber-500 hover:bg-amber-400 text-black text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:-translate-y-1"
        >
          Read Paper <ExternalLink size={18} />
        </Link>
      )}
    </div>
  </div>
);

// --- Standard Achievement Card ---
const AchievementCard = ({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative bg-[#0a0a0a]/40 hover:bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-4xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-white/20 flex flex-col h-full"
  >
    <div className="relative h-56 md:h-64 overflow-hidden shrink-0">
      <img src={achievement.coverImage} alt={achievement.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />

      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/10 font-medium tracking-wide">
        <Award size={12} className="text-amber-400" /> {achievement.category}
      </div>

      {achievement.gallery?.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {achievement.gallery.length} Certificates
        </div>
      )}
    </div>

    <div className="p-6 md:p-8 flex flex-col grow relative z-10">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors">{achievement.title}</h3>
      <p className="text-white/60 text-sm line-clamp-2 mb-8 font-light grow leading-relaxed">{achievement.description}</p>

      <div className="pt-5 border-t border-white/10 mt-auto flex items-center justify-between group/btn">
        <span className="text-white/80 group-hover:text-white text-sm font-semibold tracking-wider flex items-center gap-2 transition-colors">
          View Certificates
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-amber-500 transition-colors border border-white/5">
          <ArrowRight size={14} className="text-white transform group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-black" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function AchievementsComponent() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [carouselLightboxIndex, setCarouselLightboxIndex] = useState<number | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedAchievement || carouselLightboxIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => { document.body.style.overflow = "auto" };
  }, [selectedAchievement]);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-amber-500/30 font-sans pt-20 relative">

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        .hidden-scrollbar::-webkit-scrollbar { display: none; }

        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: slideLeft 25s linear infinite;
          width: max-content;
        }
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
      `}} />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] opacity-40" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">

        {/* Header Section */}
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter mb-4 md:mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">Achievements</span>
          </h1>
          <p className="text-white/60 text-sm md:text-xl font-light max-w-2xl mx-auto md:mx-0">
            Pioneering the cosmos through breakthrough research, provisional asteroid discoveries, and preliminary detections.
          </p>
        </div>

        {/* Featured Research Hero */}
        <FeaturedAchievementHero achievement={RESEARCH_PAPER} />

        {/* Discovery Grids */}
        <div className="space-y-6 md:space-y-12">
          <div className="flex items-center gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Discoveries & Awards</h2>
            <div className="h-px bg-linear-to-r from-white/20 to-transparent flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PROVISIONAL_ACHIEVEMENTS.map((item) => (
              <AchievementCard key={item.id} achievement={item} onClick={() => setSelectedAchievement(item)} />
            ))}
          </div>
        </div>

        {/* Preliminary Detections Carousel */}
        <div className="space-y-6 md:space-y-12 mt-16 md:mt-24">
          <div className="flex items-center gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Preliminary Detections</h2>
            <div className="h-px bg-linear-to-r from-white/20 to-transparent flex-1" />
          </div>

          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-md p-6 md:p-10 shadow-2xl">
            <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-linear-to-r from-[#050505]/90 via-[#050505]/50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 pointer-events-none bg-linear-to-l from-[#050505]/90 via-[#050505]/50 to-transparent z-10" />
            <div className="carousel-container relative overflow-hidden">
              <div className="carousel-track flex items-center gap-6 md:gap-8">
                {[...PRELIMINARY_DETECTIONS, ...PRELIMINARY_DETECTIONS].map((img, idx) => (
                  <div
                    key={`carousel-img-${idx}`}
                    className="relative group shrink-0 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/10 w-[280px] h-[200px] md:w-[400px] md:h-[280px] shadow-lg hover:border-amber-500/50 transition-colors"
                    onClick={() => setCarouselLightboxIndex(idx % PRELIMINARY_DETECTIONS.length)}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 drop-shadow-lg" size={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Master Modal for Gallery & Details */}
      <AchievementGalleryModal achievement={selectedAchievement} onClose={() => setSelectedAchievement(null)} />

      {/* Lightbox for Carousel Images */}
      <Lightbox
        images={PRELIMINARY_DETECTIONS}
        currentIndex={carouselLightboxIndex ?? 0}
        isOpen={carouselLightboxIndex !== null}
        onClose={() => setCarouselLightboxIndex(null)}
        onNavigate={setCarouselLightboxIndex}
      />
    </div>
  );
}