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
  Maximize2
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface EventImage {
  url: string;
  alt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "past";
  featured?: boolean;
  coverImage: string;
  gallery: EventImage[];
  details: { organizer?: string; category?: string; registrationLink?: string; };
  externalLink?: string;
}

// --- Full Screen Lightbox ---
const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}: {
  images: EventImage[];
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
    // Performance Fix: Removed backdrop-blur-3xl, replaced with solid 95% black to stop mobile lag
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

// --- Split-Screen Event Gallery Modal ---
const EventGalleryModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!event) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 opacity-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Lighter blur for performance, darker overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        {/* Modal Container: Changed to max-h-[90dvh] and added overflow-y-auto for proper mobile scrolling */}
        <div className="relative w-full max-w-7xl max-h-[90dvh] md:h-[85vh] bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl md:rounded-[2rem] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row border border-white/10 custom-scrollbar mt-10">

          {/* Mobile Close Button (Sticky) */}
          <button onClick={onClose} className="sticky lg:absolute top-4 right-4 ml-auto z-30 p-2.5 bg-black/80 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors lg:hidden flex">
            <X size={20} />
          </button>

          {/* Left Column: Details */}
          <div className="w-full lg:w-[40%] h-auto lg:h-full relative shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 lg:overflow-y-auto hidden-scrollbar bg-white/[0.02]">
            <div className="relative h-56 lg:h-80 w-full shrink-0 -mt-12 lg:mt-0">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            </div>

            <div className="p-6 lg:p-10 relative -mt-16 lg:-mt-20 z-10">
              <span className="px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4 inline-block">
                Past Highlight
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">{event.title}</h2>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-4 text-white/80 bg-black/40 p-4 rounded-xl md:rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <Calendar className="text-amber-400 shrink-0" size={18} />
                  <span className="text-sm font-medium tracking-wide">
                    {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/80 bg-black/40 p-4 rounded-xl md:rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <MapPin className="text-amber-400 shrink-0" size={18} />
                  <span className="text-sm font-medium tracking-wide">{event.location}</span>
                </div>
              </div>

              <div className="prose prose-invert prose-sm md:prose-base text-white/60 leading-relaxed font-light">
                <p>{event.description}</p>
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
                <h3 className="text-2xl font-semibold text-white tracking-tight">Event Gallery</h3>
                <p className="text-amber-400/70 text-sm mt-1">{event.gallery?.length || 0} moments captured</p>
              </div>

              {event.gallery?.length > 0 ? (
                <div className="columns-1 md:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6 pb-4">
                  {event.gallery.map((img, i) => (
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
                  <p className="text-white/40 text-sm font-medium tracking-wide">No images available for this event.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={event.gallery}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

// --- Featured Event Hero ---
const FeaturedEventHero = ({ event }: { event: Event }) => (
  <div className="relative w-full min-h-[450px] md:min-h-[600px] lg:h-[70vh] rounded-[2rem] overflow-hidden  mb-16 md:mb-24 group border border-white/15 flex items-end shadow-2xl bg-black">
    {/* Background Image & Overlays */}
    <div className="absolute inset-0">
      <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
    </div>
    <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent mix-blend-overlay hidden md:block" />

    {/* Featured Badge */}
    <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
      <div className="flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,1)]" />
        <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">Now Featured</span>
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 p-6 py-10 md:p-6  lg:p-16 w-full max-w-4xl">
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-6 text-white/80 font-medium tracking-wide text-sm md:text-base mt-5">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-amber-400" />
          <span>{new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-amber-400" />
          <span>{event.location}</span>
        </div>
      </div>

      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-[1.1]">
        {event.title}
      </h2>
      <p className="text-white/70 text-base md:text-lg lg:text-xl mb-8 md:mb-10 max-w-2xl font-light leading-relaxed line-clamp-4 md:line-clamp-none">
        {event.description}
      </p>

      {event?.externalLink && (
        <Link
          href={event.externalLink}
          target="_blank"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-amber-500 hover:bg-amber-400 text-black text-sm md:text-base font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:-translate-y-1"
        >
          Visit Website <ExternalLink size={18} />
        </Link>
      )}
    </div>
  </div>
);

// --- Standard Event Card ---
const EventCard = ({ event, onClick }: { event: Event; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative bg-[#0a0a0a]/40 hover:bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-white/20 flex flex-col h-full"
  >
    <div className="relative h-56 md:h-64 overflow-hidden shrink-0">
      <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />

      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/10 font-medium tracking-wide">
        <MapPin size={12} className="text-amber-400" /> {event.location}
      </div>

      {event.gallery?.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
          {event.gallery.length} Photos
        </div>
      )}
    </div>

    <div className="p-6 md:p-8 flex flex-col grow relative z-10">
      <div className="text-[11px] md:text-xs text-amber-400 mb-3 font-bold uppercase tracking-widest flex items-center gap-2">
        <Calendar size={14} />
        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors">{event.title}</h3>
      <p className="text-white/60 text-sm line-clamp-2 mb-8 font-light grow leading-relaxed">{event.description}</p>

      <div className="pt-5 border-t border-white/10 mt-auto flex items-center justify-between group/btn">
        <span className="text-white/80 group-hover:text-white text-sm font-semibold tracking-wider flex items-center gap-2 transition-colors">
          View Gallery
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-amber-500 transition-colors border border-white/5">
          <ArrowRight size={14} className="text-white transform group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-black" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    // In a real app, replace with your actual fetch logic
    fetch("/eventdata.json").then((res) => res.json()).then(setEvents).catch(console.error);
  }, []);

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedEvent) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => { document.body.style.overflow = "auto" };
  }, [selectedEvent]);

  return (
    // Transparent background allows the parent "stars" to show completely through
    <div className="min-h-screen bg-transparent text-white selection:bg-amber-500/30 font-sans">

      {/* Global styles for sleek, premium scrollbars matching the glass theme */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        .hidden-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">

        {/* Header Section */}
        <div className="mb-10 md:mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter mb-4 md:mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">Events</span>
          </h1>
          <p className="text-white/60 text-sm md:text-xl font-light max-w-2xl mx-auto md:mx-0">
            Discover what we are building next, and explore the visual archives of our past highlights.
          </p>
        </div>

        {/* Featured Event Hero */}
        {featuredEvent && (
          <FeaturedEventHero event={featuredEvent} />
        )}

        {/* Past Events Grid */}
        <div className="space-y-6 md:space-y-12">
          <div className="flex items-center gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Event Archives</h2>
            <div className="h-px bg-linear-to-r from-white/20 to-transparent flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
            ))}
          </div>
        </div>
      </div>

      {/* Master Modal for Gallery & Details */}
      <EventGalleryModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}