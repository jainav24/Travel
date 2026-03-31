import React, { useEffect, useState, useRef } from "react";
import destinations from "../data/destinations";
import stockImages from "../data/stockImages";
import { useNavigate } from "react-router-dom";

// ─── DESIGN TOKENS (Shared with App.jsx) ───────────────────────────────────────

const COLORS = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  secondary: "#F97316",
  dark: "#1a1a2e",
  muted: "#64748b",
  bg: "#ffffff",
  bgAlt: "#f1f5f9",
};

const CLAY = {
  card: {
    background: "#ffffff",
    borderRadius: 24,
    boxShadow: "10px 10px 30px rgba(0,0,0,0.12), -4px -4px 16px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,255,255,0.4)",
    border: "1px solid rgba(0,0,0,0.06)",
  }
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

// ─── LOCAL CARD (Custom for /destinations/:slug path) ────────────────────────

function GridDestinationCard({ destination, index, visible }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/destinations/${destination.slug}`)}
      style={{
        ...CLAY.card,
        position: "relative",
        overflow: "hidden",
        aspectRatio: "3 / 4",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
      className="grid-dest-card"
      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = COLORS.secondary; }}
      onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; }}
    >
      <img
        src={destination.cardImg}
        alt={destination.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }}
        className="card-img"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" style={{ position: "absolute", inset: 0 }} />
      
      {/* Tag */}
      <div style={{
          position: "absolute", top: 16, right: 16, background: COLORS.secondary,
          color: "#fff", padding: "4px 12px", borderRadius: 50,
          fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase"
      }}>
          {destination.tag}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
          {destination.country}
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", fontWeight: 700, lineHeight: 1.1 }}>
          {destination.name}
        </h3>
        <div style={{ fontSize: 11, color: COLORS.secondary, marginTop: 8, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
          Explore →
        </div>
      </div>

      <style>{`
        .grid-dest-card:hover .card-img { transform: scale(1.08); }
      `}</style>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function DestinationList() {
  const navigate = useNavigate();
  const [gridRef, gridVisible] = useScrollAnimation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.dark, fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "65vh", minHeight: 520, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={stockImages.dubai.hero}
          alt="Destinations hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(15,23,42,0.7) 100%)` }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: COLORS.secondary, fontWeight: 700, textTransform: "uppercase", marginBottom: 18 }}>
            ✦ Where To Next? ✦
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 92px)", fontWeight: 700, lineHeight: 1.05, marginBottom: 20, color: "#fff" }}>
            The World Is<br />
            <em style={{ color: "#93c5fd", fontStyle: "italic" }}>Waiting For You.</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(255,255,255,0.8)", maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>
            Discover our hand-picked collection of extraordinary destinations, curated for moments that stay with you forever.
          </p>
        </div>
        
        {/* Wave divider */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" style={{ display: "block", width: "100%" }}>
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ── GRID ── */}
      <section ref={gridRef} style={{ padding: "100px 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
           <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontWeight: 700, textTransform: "uppercase", marginBottom: 16 }}>✦ Our Handpicked Gallery</div>
           <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, color: COLORS.dark }}>Explore All Destinations</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "36px",
        }}>
          {destinations.map((dest, i) => (
            <GridDestinationCard key={dest.slug} destination={dest} index={i} visible={gridVisible} />
          ))}
        </div>
      </section>



      {/* Mobile responsive */}
      <style>{`
        @media(max-width: 768px) {
            section:first-child { height: 50vh !important; min-height: 400px !important; }
            section:first-child h1 { font-size: 40px !important; }
            section { padding: 60px 5vw !important; }
            div[style*="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))"] {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
              gap: 20px !important;
            }
        }
        @media(max-width: 480px) {
            div[style*="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))"] {
              grid-template-columns: 1fr !important;
            }
        }
      `}</style>
    </div>
  );
}
