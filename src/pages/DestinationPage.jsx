import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import destinations from "../data/destinations";
import PackageCard from "../components/PackageCard";
import { Calendar, MapPin } from "lucide-react";
import { destinationImages } from "../data/stockImages";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    dark: "#1a1a2e",
    muted: "#64748b",
    bg: "#ffffff",
    bgAlt: "#f1f5f9",
};

export default function DestinationPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const destination = destinations.find((d) => d.slug === slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const t = setTimeout(() => setLoaded(true), 60);
        return () => clearTimeout(t);
    }, [slug]);

    if (!destination) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-6"
                style={{ background: COLORS.bg }}
            >
                <div
                    className="text-5xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.dark }}
                >
                    Destination not found
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="px-8 py-3 rounded-full font-bold tracking-widest text-sm uppercase"
                    style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, color: "#fff", fontFamily: "'Montserrat', sans-serif" }}
                >
                    ← Back Home
                </button>
            </div>
        );
    }

    const heroImg = destinationImages[destination.name];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ background: COLORS.bg, minHeight: "100vh" }}
        >
            {/* ── HERO ── */}
            <div className="relative overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
                <img
                    src={heroImg}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                {/* Gradient */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%)" }}
                />

                {/* Back button */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-24 z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[12px] font-semibold tracking-widest uppercase transition-all"
                    style={{
                        left: "5vw",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.primary;
                        e.currentTarget.style.borderColor = COLORS.primary;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                    }}
                >
                    ← Back
                </button>

                {/* Hero text */}
                <div className="absolute bottom-[10%] left-0 right-0 px-[5vw] flex flex-col hero-text-container" style={{ alignItems: "flex-start" }}>
                    <div
                        className="text-[11px] tracking-[5px] uppercase font-bold mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.secondary }}
                    >
                        ✦ {destination.tag} · {destination.country}
                    </div>
                    <h1
                        className="text-white font-bold leading-none mb-5"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,9vw,110px)" }}
                    >
                        {destination.name}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                        <div
                            className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold"
                            style={{
                                background: "rgba(249,115,22,0.2)",
                                border: `1px solid rgba(249,115,22,0.5)`,
                                color: COLORS.secondary,
                                fontFamily: "'Montserrat', sans-serif",
                            }}
                        >
                            {destination.packages.length} Packages Available
                        </div>
                        <span
                            className="text-xs tracking-wide scroll-indicator"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.5)" }}
                        >
                            Scroll to explore ↓
                        </span>
                    </div>
                </div>

                {/* Floating Info Card */}
                <div className="floating-card">
                    <div className="card-item">
                        <Calendar size={20} color={COLORS.primary} />
                        <div>
                            <p>Best Time</p>
                            <h4>April – October</h4>
                        </div>
                    </div>

                    <div className="card-item">
                        <MapPin size={20} color={COLORS.primary} />
                        <div>
                            <p>Location</p>
                            <h4>{destination.country || "Asia"}</h4>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── MOBILE INFO BRIDGE ── */}
            <div className="mobile-info-bridge" style={{
                background: COLORS.bg,
                padding: "32px 20px",
                display: "none", /* Hidden by default, shown in media query */
                justifyContent: "space-around",
                alignItems: "center",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                gap: 12
            }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                        <Calendar size={20} color={COLORS.primary} strokeWidth={1.5} />
                    </div>
                    <p style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>Best Time</p>
                    <h4 style={{ fontSize: 14, color: COLORS.dark, fontWeight: 700, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>April – October</h4>
                </div>

                <div style={{ width: 1, height: 40, background: "rgba(0,0,0,0.08)" }} />

                <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                        <MapPin size={20} color={COLORS.primary} strokeWidth={1.5} />
                    </div>
                    <p style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>Location</p>
                    <h4 style={{ fontSize: 14, color: COLORS.dark, fontWeight: 700, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>{destination.country || "Asia"}</h4>
                </div>
            </div>

            {/* ── DESCRIPTION ── */}
            <div className="mx-auto px-[5vw] py-20 destination-about-sec" style={{ maxWidth: 860 }}>
                <div
                    className="text-[11px] tracking-[5px] uppercase font-bold mb-5 about-tag"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.primary }}
                >
                    ✦ About {destination.name}
                </div>
                <p
                    className="leading-relaxed italic about-desc"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,2.8vw,28px)", color: COLORS.dark }}
                >
                    {destination.description}
                </p>
            </div>

            {/* Divider */}
            <div
                className="mx-[5vw]"
                style={{ height: 1, background: `linear-gradient(to right, transparent, rgba(30,58,138,0.2), transparent)` }}
            />

            {/* ── PACKAGES ── */}
            <div className="px-[5vw] py-20" style={{ background: COLORS.bgAlt }}>
                <div className="text-center mb-14">
                    <div
                        className="text-[11px] tracking-[5px] uppercase font-bold mb-4"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.primary }}
                    >
                        ✦ Curated Itineraries
                    </div>
                    <h2
                        className="font-bold"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,56px)", color: COLORS.dark }}
                    >
                        {destination.name} Packages
                    </h2>
                </div>

                <div className="grid gap-5 mx-auto" style={{
                    maxWidth: 1200,
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                    alignItems: "stretch"
                }}>
                    {destination.packages.map((pkg, i) => (
                        <PackageCard key={pkg.title} pkg={pkg} index={i} destinationSlug={destination.slug} listingImage={destination.cardImg} />
                    ))}
                </div>
            </div>

            {/* ── FOOTER CTA ── */}
            <div className="text-center py-20 px-[5vw]" style={{ background: COLORS.bg }}>
                <button
                    onClick={() => navigate("/")}
                    className="px-9 py-3 rounded-full text-xs font-bold tracking-[3px] uppercase transition-all"
                    style={{
                        border: `1px solid ${COLORS.primary}`,
                        color: COLORS.primary,
                        background: "none",
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.primary;
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = COLORS.primary;
                    }}
                >
                    ← Explore More Destinations
                </button>
            </div>

            <style>{`
                @media(max-width: 768px) {
                    .relative.overflow-hidden[style*="height: 100vh"] { height: 75vh !important; min-height: 480px !important; }
                    
                    /* Back Button Fix - Move below navbar */
                    .absolute.top-24 { 
                        top: 90px !important; 
                        left: 20px !important; 
                        padding: 10px 20px !important;
                        font-size: 11px !important;
                        z-index: 50 !important;
                    }
                    
                    /* Hero Alignment */
                    .hero-text-container { 
                        bottom: 25% !important; 
                        align-items: center !important; 
                        text-align: center !important; 
                        padding: 0 20px !important;
                    }
                    .hero-text-container h1 { 
                        font-size: clamp(40px, 12vw, 64px) !important; 
                        margin-bottom: 20px !important; 
                        line-height: 1.1 !important;
                    }
                    .hero-text-container > div:last-child {
                        justify-content: center !important;
                        width: 100% !important;
                    }
                    
                    .scroll-indicator { display: none !important; }
                    .px-\\[5vw\\] { padding-left: 20px !important; padding-right: 20px !important; }
                    .grid.gap-5 { grid-template-columns: 1fr !important; gap: 24px !important; }
                    
                    /* About Section Padding */
                    .destination-about-sec { 
                        text-align: center !important; 
                        padding-top: 50px !important; 
                        padding-bottom: 50px !important; 
                        padding-left: 24px !important;
                        padding-right: 24px !important;
                    }
                    .about-tag { margin-bottom: 18px !important; }
                    .about-desc { font-size: 22px !important; line-height: 1.7 !important; }
                }

                .floating-card {
                    position: absolute;
                    bottom: 40px;
                    right: 40px;
                    width: 260px;
                    background: white;
                    border-radius: 20px;
                    padding: 24px;
                    box-shadow: 0 15px 45px rgba(0,0,0,0.12);
                    backdrop-filter: blur(10px);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    z-index: 20;
                }
                
                @media(max-width: 768px) {
                    .floating-card { display: none !important; }
                    .mobile-info-bridge { display: flex !important; }
                }
                .floating-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                .floating-card .card-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                .floating-card .card-item:last-child {
                    margin-bottom: 0;
                }
                .floating-card p {
                    font-size: 12px;
                    opacity: 0.6;
                    margin: 0;
                    color: #1a1a2e;
                    font-family: 'Montserrat', sans-serif;
                }
                .floating-card h4 {
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0;
                    color: #1a1a2e;
                    font-family: 'Montserrat', sans-serif;
                }
            `}</style>
        </motion.div>
    );
}
