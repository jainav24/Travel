import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import destinations from "../data/destinations";
import { destinationImages } from "../data/stockImages";
import { Search } from "lucide-react";

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

const CATEGORIES = ["All", "Adventure", "Beach", "Culture", "Luxury", "Romance"];

const DestinationGridCard = ({ dest, index, visible }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    // Image logic: use strict mapping
    const getDestImage = () => {
        return destinationImages[dest.name];
    };

    return (
        <div
            onClick={() => navigate(`/destination/${dest.slug}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
                boxShadow: hovered ? "0 15px 35px rgba(0,0,0,0.2)" : "0 8px 25px rgba(0,0,0,0.08)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                opacity: visible ? 1 : 0,
                transition: "all 0.4s ease",
            }}
        >
            <img
                src={getDestImage()}
                alt={dest.name}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.6s ease",
                    display: "block",
                }}
            />

            {/* Dark gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: hovered
                        ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, transparent 100%)",
                    transition: "background 0.4s ease",
                }}
            />

            {/* Bottom-left text */}
            <div
                style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    textAlign: "left",
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(26px, 2.5vw, 32px)",
                        color: "#fff",
                        fontWeight: 700,
                        margin: "0 0 6px 0",
                        letterSpacing: "0.02em",
                        lineHeight: 1.1,
                    }}
                >
                    {dest.name}
                </h3>
                
                <div
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    Explore <span style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s", display: "inline-block" }}>&rarr;</span>
                </div>
            </div>
        </div>
    );
};


export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [visible, setVisible] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => setVisible(true), 100);
    }, []);

    // Filter Logic
    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || dest.tag === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ background: COLORS.bg, color: COLORS.dark, minHeight: "100vh", paddingBottom: 100 }}>
            
            {/* ── HERO ── */}
            <section style={{ position: "relative", height: "55vh", minHeight: 460, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 60 }}>
                <img
                    src={destinationImages["Dubai"]}
                    alt="All Destinations"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
                
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
                    <div style={{ 
                        fontSize: 12, 
                        letterSpacing: 6, 
                        color: COLORS.secondary, 
                        fontWeight: 700, 
                        textTransform: "uppercase", 
                        marginBottom: 16,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.6s ease"
                    }}>
                        ✦ Wanderlust ✦
                    </div>
                    <h1 style={{ 
                        fontFamily: "'Cormorant Garamond', serif", 
                        fontSize: "clamp(48px, 6vw, 72px)", 
                        fontWeight: 700, 
                        lineHeight: 1.1, 
                        marginBottom: 16, 
                        color: "#fff",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.6s ease 0.1s"
                    }}>
                        Explore All Destinations
                    </h1>
                </div>
            </section>

            {/* ── FILTERS ── */}
            <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 5vw", marginBottom: 60 }}>
                <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 32, 
                    alignItems: "center",
                    opacity: visible ? 1 : 0,
                    transition: "all 0.6s ease 0.3s"
                }}>
                    {/* Search Bar - Non-functional for now as per user request to keep UI-focused, but implemented functional search for better UX */}
                    <div style={{ 
                        position: "relative", 
                        width: "100%", 
                        maxWidth: 500,
                    }}>
                        <input 
                            type="text" 
                            placeholder="Find your dream destination..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ 
                                width: "100%",
                                padding: "16px 24px 16px 56px",
                                borderRadius: 50,
                                border: "1px solid rgba(0,0,0,0.08)",
                                background: COLORS.bgAlt,
                                fontSize: 14,
                                fontFamily: "'Montserrat', sans-serif",
                                outline: "none",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                            }}
                            onFocus={(e) => e.target.style.background = "#fff"}
                            onBlur={(e) => e.target.style.background = COLORS.bgAlt}
                        />
                        <Search size={20} style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", color: COLORS.muted }} />
                    </div>

                    {/* Category Tags */}
                    <div style={{ 
                        display: "flex", 
                        gap: 12, 
                        flexWrap: "wrap", 
                        justifyContent: "center"
                    }}>
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{ 
                                    padding: "10px 24px",
                                    borderRadius: 50,
                                    border: selectedCategory === cat ? `2px solid ${COLORS.primary}` : "1px solid rgba(0,0,0,0.08)",
                                    background: selectedCategory === cat ? COLORS.primary : "transparent",
                                    color: selectedCategory === cat ? "#fff" : COLORS.muted,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GRID ── */}
            <section ref={gridRef} style={{ maxWidth: 1440, margin: "0 auto", padding: "0 5vw" }}>
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(4, 1fr)", 
                    gap: "40px 32px",
                }} className="destinations-grid">
                    {filteredDestinations.map((dest, i) => (
                        <DestinationGridCard key={dest.slug} dest={dest} index={i} visible={visible} />
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div style={{ textAlign: "center", padding: "100px 20px", color: COLORS.muted }}>
                        <div style={{ fontSize: 48, marginBottom: 20 }}>🔍</div>
                        <h3 style={{ fontFamily: "'Montserrat', sans-serif" }}>No destinations found matching your search.</h3>
                        <button 
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            style={{ 
                                background: "none", 
                                border: "none", 
                                color: COLORS.primary, 
                                fontWeight: 700, 
                                textDecoration: "underline", 
                                cursor: "pointer",
                                marginTop: 10
                            }}
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </section>

            {/* Custom Responsive Styles */}
            <style>{`
                .destinations-grid { 
                    gap: 24px !important; 
                }
                @media(max-width: 900px) {
                    .destinations-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media(max-width: 600px) {
                    .destinations-grid { grid-template-columns: repeat(1, 1fr) !important; }
                }
            `}</style>

        </div>
    );
}
