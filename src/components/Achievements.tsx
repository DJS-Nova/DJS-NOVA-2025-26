"use client";
import React, { useState, useEffect } from "react";
import {
    achievementsData,
    categoriesData,
    statsData,
    filterAchievementsByCategory,
    getIconComponent,
} from "@/config/achievements";

const AchievementsComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isMounted, setIsMounted] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [certificates, setCertificates] = useState<
        Array<{
            id: number;
            title: string;
            url: string | null;
            type: string;
        }>
    >([]);

    // Ensure animations only trigger on client-side mount
    useEffect(() => {
        setIsMounted(true);
        // Fetch certificate images from JSON
        fetch("/achievements/images.json")
            .then((res) => res.json())
            .then((data) => setCertificates(data))
            .catch((err) => console.error("Failed to load certificates:", err));
    }, []);

    const filteredAchievements = filterAchievementsByCategory(
        achievementsData,
        selectedCategory,
    );

    if (!isMounted) return <div className="min-h-screen bg-black" />;

    return (
        <section className="min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-black overflow-hidden">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter">
                    ACHIEVEMENTS
                </h1>
                <div className="h-1 w-24 bg-amber-400 mx-auto rounded-full mt-4" />
                <p className="text-gray-400 text-sm md:text-base tracking-[0.3em] uppercase pt-4">
                    Success Stories in Research & Awards
                </p>
            </div>

            {/* TOP Part */}
            <div className="max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Research Paper Published by our Members
                </h2>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <p className="text-gray-300 text-sm mb-6">
                        Placeholder for one page of the research paper.
                    </p>
                    <div className="h-80 md:h-96 w-full rounded-xl border-2 border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-400">
                        Research Paper Page Image Placeholder
                    </div>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    IAAC Awards & NSASC Awards
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        National Spaceonova Asteroid Search Campaign Provisional Discoveries
                        Awards
                    </h3>
                    <div className="space-y-4">
                        {["name1", "name1", "name1"].map((name, idx) => (
                            <div key={`nsasc-${idx}`} className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg border border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-400">
                                    Image
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{name}</p>
                                    <p className="text-gray-400 text-sm">Award placeholder</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                        International Astronomy and Astrophysics Competition(IAAC) Awards
                        2025
                    </h3>
                    <div className="space-y-4">
                        {["name1", "name1", "name1"].map((name, idx) => (
                            <div key={`iaac-${idx}`} className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg border border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-400">
                                    Image
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{name}</p>
                                    <p className="text-gray-400 text-sm">Award placeholder</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Third Part */}
            <div className="max-w-6xl mx-auto mt-20 mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Preliminary Discoveries
                </h2>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="absolute inset-y-0 left-0 w-24 pointer-events-none bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-24 pointer-events-none bg-gradient-to-l from-black via-black/40 to-transparent z-10" />
                    <div className="carousel-container relative overflow-hidden">
                        <div className="carousel-track flex items-center gap-6">
                            {certificates.map((cert) => (
                                <div key={`cert-${cert.id}`}>
                                    {cert.type === "certificate" && cert.url ? (
                                        <img
                                            src={cert.url}
                                            alt={cert.title}
                                            onClick={() => setSelectedImage(cert.id - 1)}
                                            className="h-72 w-96 min-w-[384px] rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 border border-amber-400/50"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setSelectedImage(cert.id - 1)}
                                            className="h-72 w-96 min-w-[384px] rounded-xl border-2 border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-300 text-sm font-semibold cursor-pointer hover:border-amber-400 hover:bg-white/10 transition-all duration-300"
                                        >
                                            {cert.title}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {certificates.map((cert) => (
                                <div key={`cert-copy-${cert.id}`}>
                                    {cert.type === "certificate" && cert.url ? (
                                        <img
                                            src={cert.url}
                                            alt={cert.title}
                                            onClick={() => setSelectedImage(cert.id - 1)}
                                            className="h-72 w-96 min-w-[384px] rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300 border border-amber-400/50"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setSelectedImage(cert.id - 1)}
                                            className="h-72 w-96 min-w-[384px] rounded-xl border-2 border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-300 text-sm font-semibold cursor-pointer hover:border-amber-400 hover:bg-white/10 transition-all duration-300"
                                        >
                                            {cert.title}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && certificates[selectedImage] && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white/50 hover:text-amber-400 bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all border border-white/10"
                    >
                        ✕
                    </button>
                    <div
                        className="relative bg-white/5 border border-white/10 rounded-2xl p-6 max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {certificates[selectedImage].type === "certificate" &&
                            certificates[selectedImage].url ? (
                            <img
                                src={certificates[selectedImage].url}
                                alt={certificates[selectedImage].title}
                                className="w-full h-auto rounded-xl max-h-96 object-contain"
                            />
                        ) : (
                            <div className="h-96 w-full rounded-xl border-2 border-dashed border-gray-500 bg-white/5 flex items-center justify-center text-gray-400">
                                {certificates[selectedImage].title} - Placeholder
                            </div>
                        )}
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Click outside or press ✕ to close
                        </p>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-track {
          animation: slideLeft 25s linear infinite;
          width: calc((384px + 24px) * 20);
        }

        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
};

export default AchievementsComponent;