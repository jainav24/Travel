import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const COLORS = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  secondary: "#F97316",
  muted: "#64748b",
};

/* ─── MOBILE CARD (Swiper carousel — do not touch) ─────────────────────────── */
function MobileGallery({ destinations, go }) {
  return (
    <div style={{ width: "100%", paddingBottom: 20 }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {destinations.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="destination-card"
              onClick={() => go(item.slug)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.img} alt={item.name} />
              <div
                className="overlay"
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "24px 20px",
                }}
              >
                <span style={{
                  color: "#fff", background: COLORS.secondary, padding: "5px 12px",
                  borderRadius: 999, fontSize: 10, fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif", letterSpacing: 2,
                  textTransform: "uppercase", alignSelf: "flex-start", marginBottom: 10,
                }}>
                  {item.tag}
                </span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff",
                  fontWeight: 700, margin: 0, textShadow: "0 2px 14px rgba(0,0,0,0.45)",
                }}>
                  {item.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .destination-card {
          width: 100%; aspect-ratio: 1 / 1;
          border-radius: 20px; overflow: hidden; position: relative;
        }
        .destination-card img { width: 100%; height: 100%; object-fit: cover; }
        .swiper-slide { transform: scale(0.9); opacity: 0.6; transition: all 0.3s ease; }
        .swiper-slide-active { transform: scale(1); opacity: 1; }
      `}</style>
    </div>
  );
}

/* ─── SINGLE DESKTOP CARD ───────────────────────────────────────────────────── */
function GalleryCard({ dest, height = "100%", go }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => go(dest.slug)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.22)"
          : "0 6px 24px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.38s ease",
      }}
    >
      {/* Image */}
      <img
        src={dest.img}
        alt={dest.name}
        loading="lazy"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? "linear-gradient(to top, rgba(10,20,60,0.82) 0%, rgba(10,20,60,0.25) 55%, transparent 100%)"
          : "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
        transition: "background 0.4s ease",
      }} />

      {/* Tag pill */}
      <div style={{
        position: "absolute", top: 14, left: 14,
        background: hovered ? COLORS.secondary : "rgba(255,255,255,0.18)",
        backdropFilter: "blur(6px)",
        padding: "5px 13px",
        borderRadius: 999,
        border: hovered ? "none" : "1px solid rgba(255,255,255,0.35)",
        transition: "background 0.3s ease, border 0.3s ease",
      }}>
        <span style={{
          color: "#fff",
          fontSize: 9, fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase",
        }}>
          {dest.tag}
        </span>
      </div>

      {/* Arrow button — appears on hover */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        width: 34, height: 34, borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        <span style={{ color: "#fff", fontSize: 14, lineHeight: 1 }}>→</span>
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: hovered ? "22px 20px 24px" : "16px 18px 18px",
        transition: "padding 0.35s ease",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 1.8vw, 26px)",
          color: "#fff",
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.15,
          textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          letterSpacing: "-0.01em",
        }}>
          {dest.name}
        </h3>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          color: "rgba(255,255,255,0.75)",
          letterSpacing: 2,
          marginTop: 5,
          textTransform: "uppercase",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s 0.05s ease, transform 0.3s 0.05s ease",
        }}>
          Explore Packages →
        </div>
      </div>
    </div>
  );
}

/* ─── DESKTOP MAGAZINE GRID ─────────────────────────────────────────────────── */
function DesktopGallery({ destinations, go }) {
  // Layout: 9 destinations in a 3-column editorial grid
  // Col 1: 1 tall hero (rows 1-2) + 1 medium (row 3)
  // Col 2: 1 wide (row 1) + 1 wide (row 2) + 1 wide (row 3)
  // Col 3: 1 medium (row 1) + 1 tall hero (rows 2-3)
  // = stays 3 col; each row is ~220px; total height ~680px
  const [d0, d1, d2, d3, d4, d5, d6, d7, d8] = destinations;

  const ROW_H = 220;
  const GAP = 12;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr 1.05fr",
      gridTemplateRows: `${ROW_H}px ${ROW_H}px ${ROW_H}px`,
      gap: GAP,
      height: ROW_H * 3 + GAP * 2,
    }}>

      {/* ── COL 1 ── */}
      {/* Hero tall card — spans rows 1–2 */}
      <div style={{ gridColumn: "1", gridRow: "1 / 3", position: "relative" }}>
        {d0 && <GalleryCard dest={d0} height="100%" go={go} />}
      </div>
      {/* Short bottom card — row 3 */}
      <div style={{ gridColumn: "1", gridRow: "3", position: "relative" }}>
        {d1 && <GalleryCard dest={d1} height="100%" go={go} />}
      </div>

      {/* ── COL 2 — three equal stacked cards ── */}
      <div style={{ gridColumn: "2", gridRow: "1", position: "relative" }}>
        {d2 && <GalleryCard dest={d2} height="100%" go={go} />}
      </div>
      <div style={{ gridColumn: "2", gridRow: "2", position: "relative" }}>
        {d3 && <GalleryCard dest={d3} height="100%" go={go} />}
      </div>
      <div style={{ gridColumn: "2", gridRow: "3", position: "relative" }}>
        {d4 && <GalleryCard dest={d4} height="100%" go={go} />}
      </div>

      {/* ── COL 3 ── */}
      {/* Short top card — row 1 */}
      <div style={{ gridColumn: "3", gridRow: "1", position: "relative" }}>
        {d5 && <GalleryCard dest={d5} height="100%" go={go} />}
      </div>
      {/* Hero tall card — spans rows 2–3 */}
      <div style={{ gridColumn: "3", gridRow: "2 / 4", position: "relative" }}>
        {d6 && <GalleryCard dest={d6} height="100%" go={go} />}
      </div>

      {/* ── Remaining destinations shown as mini row of 2 below ── */}
      <style>{`
        @media (max-width: 1024px) {
          .gallery-desktop-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────────────────────── */
export default function TravelGalleryBars({ destinations }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const go = (slug) => navigate(`/destination/${slug}`);

  if (isMobile) {
    return <MobileGallery destinations={destinations} go={go} />;
  }

  return (
    <>
      <DesktopGallery destinations={destinations} go={go} />
      {/* Extra destinations (8th, 9th) shown as 2-col mini strip below */}
      {destinations.length > 7 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(destinations.length - 7, 3)}, 1fr)`,
          gap: 12,
          marginTop: 12,
          height: 160,
        }}>
          {destinations.slice(7).map((dest) => (
            <GalleryCard key={dest.slug} dest={dest} height="100%" go={go} />
          ))}
        </div>
      )}
    </>
  );
}
