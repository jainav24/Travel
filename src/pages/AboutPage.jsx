import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import stockImages from "../data/stockImages";
import { Compass, Crown, Leaf, Headphones, MapPin, Sparkles } from "lucide-react";

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

const stats = [
    { val: "500+", label: "Happy Travellers", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { val: "80+", label: "Destinations", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { val: "250+", label: "Packages", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /></svg> },
    { val: "4.9", label: "Avg Rating", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
];

const values = [
    { icon: <Compass size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "Personalised Planning", desc: "Every trip is built around you — your pace, your interests, your dream. No generic packages, ever." },
    { icon: <Crown size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "Premium Quality", desc: "We partner only with the finest hotels, guides, and experiences — curated through rigorous vetting." },
    { icon: <Leaf size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "Responsible Travel", desc: "We're committed to sustainable, eco-conscious tourism that preserves cultures and natural beauty." },
    { icon: <Headphones size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "24/7 Support", desc: "From the moment you book to the moment you return, our team is always just a call away." },
    { icon: <MapPin size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "Expert Local Knowledge", desc: "Our on-ground partners in every destination ensure you experience the authentic, not the touristy." },
    { icon: <Sparkles size={28} color={COLORS.primary} strokeWidth={1.5} />, title: "Seamless Experience", desc: "Flights, hotels, transfers, activities — we coordinate every detail so you just enjoy the journey." },
];



const aboutDestinations = [
    { name: "Bali", img: stockImages.bali.card },
    { name: "Santorini", img: stockImages.greece.card },
    { name: "Japan", img: stockImages.japan.card },
    { name: "Dubai", img: stockImages.dubai.card },
];

export default function AboutPage() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
    const [statsRef, statsVisible] = useScrollAnimation();
    const [valuesRef, valuesVisible] = useScrollAnimation();

    const [destRef, destVisible] = useScrollAnimation();

    return (
        <div style={{ background: COLORS.bg, color: COLORS.dark, fontFamily: "'Montserrat', sans-serif" }}>

            {/* ── HERO ── */}
            <section style={{ position: "relative", height: "70vh", minHeight: 520, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                    src={stockImages["northern-lights"].hero}
                    alt="About hero"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(30,58,138,0.82) 0%, rgba(15,23,42,0.7) 100%)` }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", marginTop: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", marginBottom: 18 }}>
                        ✦ Our Story ✦
                    </div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 86px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 20, color: "#fff" }}>
                        We Don't Just Plan Trips.<br />
                        <em style={{ color: "#93c5fd", fontStyle: "italic" }}>We Craft Memories.</em>
                    </h1>
                    <p style={{ fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                        Born from a love of discovery, WE PLAN TRIPS has been turning travel dreams into extraordinary reality since 2023.
                    </p>
                </div>
                <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
                    <svg viewBox="0 0 1440 60" style={{ display: "block", width: "100%" }}>
                        <path d="M0,60 L1440,0 L1440,60 Z" fill={COLORS.bg} />
                    </svg>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section ref={statsRef} style={{ background: `linear-gradient(135deg, ${COLORS.primary}, #2563eb)`, padding: "50px 5vw" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
                    {stats.map((s, i) => (
                        <div key={s.label} style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ${i * 0.1}s` }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {s.icon}
                            </div>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 58px)", color: "#fff", fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section style={{ padding: "100px 5vw", maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>✦ Who We Are</div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 24, color: COLORS.dark }}>
                            A Team Obsessed<br />with Your Journey
                        </h2>
                        <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                            Founded in 2023, WE PLAN TRIPS started as a small team of passionate travellers who believed that the best trips aren't found in brochures — they're built conversation by conversation, detail by detail.
                        </p>
                        <p style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
                            Today, we've helped over 500 travellers experience the world in a way that's deeply personal, seamlessly organised, and utterly unforgettable. From private villas in Bali to the Northern Lights in Lapland — every trip we craft carries our promise: <em style={{ color: COLORS.primaryLight, fontWeight: 600 }}>you'll want to come back for more.</em>
                        </p>
                        <a href="/#packages" style={{
                            display: "inline-block",
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                            color: "#fff", padding: "13px 36px", borderRadius: 50,
                            textDecoration: "none", fontSize: 12, fontWeight: 700,
                            letterSpacing: 3, textTransform: "uppercase",
                            boxShadow: "0 8px 30px rgba(30,58,138,0.3)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 14px 36px rgba(30,58,138,0.45)"; }}
                            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(30,58,138,0.3)"; }}>
                            Explore Packages
                        </a>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", boxShadow: "12px 12px 30px rgba(0,0,0,0.1), -6px -6px 16px rgba(255,255,255,0.7)" }}>
                            <img src={stockImages.bali.gallery[2]} alt="Travellers" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{
                            position: "absolute", bottom: -24, right: -24,
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                            borderRadius: 20, padding: "22px 28px",
                            boxShadow: "0 12px 40px rgba(30,58,138,0.35)", textAlign: "center",
                        }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1 }}>3+</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>Years of Excellence</div>
                        </div>
                        <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, border: `2px solid ${COLORS.bgAlt2}`, borderRadius: "50%", opacity: 0.5 }} />
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES ── */}
            <section ref={valuesRef} style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>✦ What Drives Us</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: COLORS.dark }}>Our Core Values</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
                    {values.map((v, i) => (
                        <div key={v.title}
                            style={{
                                ...CLAY.card,
                                padding: "36px 30px",
                                opacity: valuesVisible ? 1 : 0,
                                transform: valuesVisible ? "translateY(0)" : "translateY(28px)",
                                transition: `all 0.6s ${i * 0.08}s`, cursor: "default",
                            }}
                            onMouseOver={e => { Object.assign(e.currentTarget.style, CLAY.cardHover); e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseOut={e => { e.currentTarget.style.boxShadow = CLAY.card.boxShadow; e.currentTarget.style.border = CLAY.card.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.primaryLight}15)` }}>{v.icon}</div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.dark, fontWeight: 600, marginBottom: 10 }}>{v.title}</h3>
                            <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.8 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* ── DESTINATIONS WE LOVE ── */}
            <section ref={destRef} style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontWeight: 700, textTransform: "uppercase", marginBottom: 14 }}>✦ Where We Take You</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: COLORS.dark }}>Destinations We Love</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
                    {aboutDestinations.map((d, i) => (
                        <div key={d.name}
                            style={{
                                position: "relative", borderRadius: 20, overflow: "hidden",
                                height: 220, cursor: "pointer",
                                opacity: destVisible ? 1 : 0, transform: destVisible ? "scale(1)" : "scale(0.95)",
                                transition: `all 0.6s ${i * 0.07}s`,
                                boxShadow: "6px 6px 18px rgba(0,0,0,0.08), -3px -3px 10px rgba(255,255,255,0.6)",
                            }}
                            onMouseOver={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.08)"; e.currentTarget.querySelector(".dest-overlay").style.opacity = "1"; }}
                            onMouseOut={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".dest-overlay").style.opacity = "0"; }}>
                            <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(30,58,138,0.75) 0%, transparent 60%)` }} />
                            <div className="dest-overlay" style={{ position: "absolute", inset: 0, background: "rgba(30,58,138,0.2)", opacity: 0, transition: "opacity 0.4s" }} />
                            <div style={{ position: "absolute", bottom: 18, left: 20 }}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#fff", fontWeight: 700 }}>{d.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <button
                        onClick={() => navigate("/destinations")}
                        style={{
                            display: "inline-block",
                            background: "transparent",
                            color: COLORS.primary,
                            padding: "12px 32px",
                            borderRadius: 50,
                            border: `1.5px solid ${COLORS.primary}`,
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            fontFamily: "'Montserrat', sans-serif"
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = COLORS.primary;
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(30,58,138,0.2)";
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = COLORS.primary;
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        View All Destinations
                    </button>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section style={{ position: "relative", overflow: "hidden", padding: "90px 5vw", textAlign: "center", background: `linear-gradient(135deg, ${COLORS.primary} 0%, #2563eb 100%)` }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: "rgba(255,255,255,0.7)", fontWeight: 700, textTransform: "uppercase", marginBottom: 18 }}>✦ Ready to Explore?</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                        Your Next Adventure<br />Starts Here
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
                        Tell us where you want to go — we'll handle everything else and turn it into the trip of a lifetime.
                    </p>
                    <button onClick={() => navigate("/destinations")} style={{
                        display: "inline-block", background: "#fff",
                        color: COLORS.primary, padding: "14px 44px", borderRadius: 50,
                        border: "none", fontSize: 13, fontWeight: 700,
                        letterSpacing: 3, textTransform: "uppercase",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                        transition: "transform 0.2s",
                        cursor: "pointer"
                    }}
                        onMouseOver={e => e.target.style.transform = "translateY(-3px)"}
                        onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                        Start Planning
                    </button>
                </div>
            </section>

            {/* Mobile responsive */}
            <style>{`
                @media(max-width: 768px) {
                    /* Hero */
                    section:first-child { min-height: 400px !important; height: 55vh !important; }
                    section:first-child h1 { font-size: 36px !important; }

                    /* Story section grid */
                    section:nth-of-type(3) > div > div { grid-template-columns: 1fr !important; gap: 30px !important; }
                    section:nth-of-type(3) > div > div > div:last-child > div:first-child { border-radius: 20px !important; aspect-ratio: 16/10 !important; }
                    section:nth-of-type(3) > div > div > div:last-child > div:last-child { display: none !important; }
                    section:nth-of-type(3) > div > div > div:last-child > div:nth-child(2) { bottom: -16px !important; right: -8px !important; }

                    /* Values grid */
                    section:nth-of-type(4) > div:last-child { grid-template-columns: 1fr !important; }



                    /* Dest grid */
                    section:nth-of-type(6) > div:last-child { grid-template-columns: 1fr !important; }

                    /* general */
                    section { padding: 60px 4vw !important; }
                }

            `}</style>

        </div>
    );
}
