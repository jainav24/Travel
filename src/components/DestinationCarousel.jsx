import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    muted: "#64748b",
    bg: "#ffffff",
    bgAlt: "#f1f5f9",
    bgAlt2: "#e2e8f0",
    dark: "#1a1a2e",
};

export default function DestinationCarousel({ destinations }) {
    const [activeIndex, setActiveIndex] = useState(() => Math.floor(destinations.length / 2));
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragDeltaX, setDragDeltaX] = useState(0);
    const containerRef = useRef(null);
    const firstCardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const OVERLAP = 120; // Exact pixel bridging between cards

    const [cardWidth, setCardWidth] = useState(300);
    useEffect(() => {
        const measure = () => {
            if (firstCardRef.current) {
                setCardWidth(firstCardRef.current.getBoundingClientRect().width);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const STEP = cardWidth - OVERLAP;

    const prev = useCallback(() => setActiveIndex((i) => (i - 1 + destinations.length) % destinations.length), [destinations.length]);
    const next = useCallback(() => setActiveIndex((i) => (i + 1) % destinations.length), [destinations.length]);

    useEffect(() => {
        if (isDragging || isHovered) return;
        const interval = setInterval(() => next(), 3000);
        return () => clearInterval(interval);
    }, [isDragging, isHovered, next]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next]);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragDeltaX(0);
    };
    const onMouseMove = useCallback(
        (e) => { if (isDragging) setDragDeltaX(e.clientX - dragStartX); },
        [isDragging, dragStartX]
    );
    const onMouseUp = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDeltaX < -STEP * 0.25) next();
        else if (dragDeltaX > STEP * 0.25) prev();
        setDragDeltaX(0);
    }, [isDragging, dragDeltaX, STEP, next, prev]);

    const onTouchStart = (e) => {
        setIsDragging(true);
        setDragStartX(e.touches[0].clientX);
        setDragDeltaX(0);
    };
    const onTouchMove = useCallback(
        (e) => { if (isDragging) setDragDeltaX(e.touches[0].clientX - dragStartX); },
        [isDragging, dragStartX]
    );
    const onTouchEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDeltaX < -40) next();
        else if (dragDeltaX > 40) prev();
        setDragDeltaX(0);
    }, [isDragging, dragDeltaX, next, prev]);

    // Calculate a continuous floating index for smooth drag interpolation
    const activeIndexFloat = activeIndex - (isDragging ? dragDeltaX / 200 : 0);

    return (
        <section
            id="destinations"
            className="relative py-24 overflow-hidden select-none"
            style={{ background: COLORS.bgAlt }}
        >
            {/* Header */}
            <div className="text-center mb-14 px-[5vw]">
                <div
                    className="text-[11px] tracking-[5px] uppercase mb-4 font-bold"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.primary }}
                >
                    ✦ Discover the World
                </div>
                <h2
                    className="font-bold leading-none mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5.5vw,64px)", color: COLORS.dark }}
                >
                    Top Destinations
                </h2>
                <p
                    className="mx-auto text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted, maxWidth: 400 }}
                >
                    Handpicked corners of the Earth, curated for the discerning traveller.
                    Drag, swipe, or use arrows to explore.
                </p>
            </div>

            {/* Carousel viewport */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                style={{ perspective: 1400 }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={(e) => { setIsHovered(false); onMouseUp(e); }}
                onMouseEnter={() => setIsHovered(true)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Fade edges */}
                <div
                    className="absolute top-0 left-0 h-full pointer-events-none z-20"
                    style={{ width: "10vw", background: `linear-gradient(to right, ${COLORS.bgAlt}, transparent)` }}
                />
                <div
                    className="absolute top-0 right-0 h-full pointer-events-none z-20"
                    style={{ width: "10vw", background: `linear-gradient(to left, ${COLORS.bgAlt}, transparent)` }}
                />

                {/* Left arrow */}
                <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="absolute left-[4vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                    style={{
                        border: `1px solid ${COLORS.bgAlt2}`,
                        background: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(12px)",
                        color: COLORS.primary,
                        boxShadow: "4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.8)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.primary;
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                        e.currentTarget.style.color = COLORS.primary;
                    }}
                >
                    ←
                </button>

                {/* Right arrow */}
                <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="absolute right-[4vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                    style={{
                        border: `1px solid ${COLORS.bgAlt2}`,
                        background: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(12px)",
                        color: COLORS.primary,
                        boxShadow: "4px 4px 12px rgba(0,0,0,0.06), -2px -2px 8px rgba(255,255,255,0.8)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.primary;
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                        e.currentTarget.style.color = COLORS.primary;
                    }}
                >
                    →
                </button>

                <div
                    className="relative w-full h-[540px] flex justify-center items-center"
                    style={{ perspective: 1600 }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={(e) => { setIsHovered(false); onMouseUp(e); }}
                    onMouseEnter={() => setIsHovered(true)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {destinations.map((dest, i) => {
                        let rawOffset = i - activeIndexFloat;
                        // For seamless visual wrapping, if offset is way off, wrap it to the closest circle arc
                        if (rawOffset > destinations.length / 2) rawOffset -= destinations.length;
                        if (rawOffset < -destinations.length / 2) rawOffset += destinations.length;

                        return (
                            <DestinationCard
                                key={dest.slug}
                                destination={dest}
                                offset={rawOffset}
                                isDragging={isDragging}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-center gap-5 mt-10">
                <div className="flex gap-1.5 items-center">
                    {destinations.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: 10,
                                height: 10,
                                background: i === activeIndex ? COLORS.primary : COLORS.bgAlt2,
                                border: "none",
                                padding: 0,
                                transform: i === activeIndex ? "scale(1.2)" : "scale(1)",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Counter */}
            <div
                className="text-center mt-4 tracking-[3px] text-[11px]"
                style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted }}
            >
                {String(activeIndex + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
            </div>

            <style>{`
                @media(max-width: 768px) {
                    #destinations { padding: 60px 3vw !important; }
                    #destinations .text-center.mb-14 { margin-bottom: 28px !important; }
                    #destinations button[class*="absolute"][class*="left-"] { width: 36px !important; height: 36px !important; font-size: 16px !important; left: 2vw !important; }
                    #destinations button[class*="absolute"][class*="right-"] { width: 36px !important; height: 36px !important; font-size: 16px !important; right: 2vw !important; }
                }
            `}</style>
        </section>
    );
}
