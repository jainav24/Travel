import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import destinations from "../data/destinations";
import stockImages from "../data/stockImages";
import DestinationCard from "../components/DestinationCard";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    dark: "#1a1a2e",
    muted: "#64748b",
    bg: "#ffffff",
    bgAlt: "#f1f5f9",
    bgAlt2: "#e2e8f0",
};

const CLAY = {
    card: {
        background: COLORS.bg,
        borderRadius: 20,
        boxShadow: "8px 8px 20px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)",
        border: "1px solid rgba(0,0,0,0.04)",
    },
    cardHover: {
        boxShadow: "10px 10px 28px rgba(30,58,138,0.12), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
        border: `1px solid rgba(30,58,138,0.15)`,
    },
};

const useScrollAnimation = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

export default function DestinationsPage() {
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
    const [gridRef, gridVisible] = useScrollAnimation();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{ background: COLORS.bg, color: COLORS.dark, fontFamily: "'Montserrat', sans-serif" }}>

            {/* ── HERO ── */}
            <section style={{ position: "relative", height: "60vh", minHeight: 480, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                    src={stockImages.greece.hero}
                    alt="Destinations hero"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(30,58,138,0.82) 0%, rgba(15,23,42,0.7) 100%)` }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", marginTop: 40 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", marginBottom: 18 }}>
                        ✦ Explore the World ✦
                    </div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 86px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 20, color: "#fff" }}>
                        All Destinations<br />
                        <em style={{ color: "#93c5fd", fontStyle: "italic" }}>Awaits You.</em>
                    </h1>
                    <p style={{ fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                        Discover handpicked corners of the Earth, curated for the discerning traveller.
                    </p>
                </div>
                <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
                    <svg viewBox="0 0 1440 60" style={{ display: "block", width: "100%" }}>
                        <path d="M0,60 L1440,0 L1440,60 Z" fill={COLORS.bg} />
                    </svg>
                </div>
            </section>

            {/* ── DESTINATIONS GRID ── */}
            <section ref={gridRef} style={{ background: COLORS.bg, padding: "90px 5vw", minHeight: "60vh" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>✦ Discover Your Next Journey</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: COLORS.dark }}>Our Travel Gallery</h2>
                    <p style={{ color: COLORS.muted, fontSize: 15, maxWidth: 500, margin: "20px auto 0", lineHeight: 1.7 }}>
                        From tropical escapes to cultural heritage, find the perfect destination for your next unforgettable adventure.
                    </p>
                </div>

                {isMobile ? (
                    <div style={{
                        opacity: gridVisible ? 1 : 0,
                        transform: gridVisible ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s ease-out"
                    }}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={16}
                            slidesPerView={1.2}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            className="mobile-swiper"
                        >
                            {destinations.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="destination-card">
                                        <img src={item.cardImg || item.heroImg} alt={item.name} />
                                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                                            <h3 style={{ margin: 0, color: "#fff", fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <div 
                        className="destinations-grid"
                        style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                            gap: "32px", 
                            maxWidth: "1400px", 
                            margin: "0 auto",
                            opacity: gridVisible ? 1 : 0,
                            transform: gridVisible ? "translateY(0)" : "translateY(30px)",
                            transition: "all 0.8s ease-out"
                        }}
                    >
                        {destinations.map((dest) => (
                            <div key={dest.slug} style={{ display: "flex", justifyContent: "center" }}>
                                <DestinationCard 
                                    destination={dest} 
                                    offset={0} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── CTA BANNER ── */}
            <section style={{ position: "relative", overflow: "hidden", padding: "90px 5vw", textAlign: "center", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #2563eb 100%)` }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: "rgba(255,255,255,0.7)", fontWeight: 700, textTransform: "uppercase", marginBottom: 18 }}>✦ Can't decide?</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                        Let's Plan Your<br />Unique Story
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
                        Share your preferences and we'll curate a bespoke journey just for you.
                    </p>
                    <a href="/#contact" style={{
                        display: "inline-block", background: "#fff",
                        color: COLORS.primary, padding: "14px 44px", borderRadius: 50,
                        textDecoration: "none", fontSize: 13, fontWeight: 700,
                        letterSpacing: 3, textTransform: "uppercase",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        transition: "transform 0.2s",
                    }}
                        onMouseOver={e => e.target.style.transform = "translateY(-3px)"}
                        onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                        Get in Touch
                    </a>
                </div>
            </section>

            <style>{`
                @media(max-width: 768px) {
                    section:first-child { min-height: 400px !important; height: 50vh !important; }
                    section:first-child h1 { font-size: 36px !important; }
                    section { padding: 60px 4vw !important; }

                    .destination-card {
                        width: 100% !important;
                        aspect-ratio: 1 / 1 !important;
                        border-radius: 20px !important;
                        overflow: hidden !important;
                        position: relative;
                        display: block;
                    }
                    .destination-card img {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    }

                    .swiper-slide {
                        opacity: 0.6;
                        transform: scale(0.9);
                        transition: 0.3s;
                    }

                    .swiper-slide-active {
                        opacity: 1 !important;
                        transform: scale(1) !important;
                    }
                }
            `}</style>
        </div>
    );
}
