import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const COLORS = {
  secondary: "#F97316",
  muted: "#64748b",
};

/**
 * Interactive vertical gallery bars — expands on hover (desktop) or tap (mobile).
 * Same data shape as galleryDestinations in App.jsx.
 */
export default function TravelGalleryBars({ destinations }) {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isCoarse, setIsCoarse] = useState(
    typeof window !== "undefined" && window.matchMedia("(hover: none), (max-width: 768px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (max-width: 768px)");
    const update = () => setIsCoarse(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (slug) => {
      navigate(`/destination/${slug}`);
    },
    [navigate],
  );

  const handleBarActivate = useCallback(
    (slug, index) => {
      if (isCoarse) {
        if (mobileExpanded === index) {
          go(slug);
        } else {
          setMobileExpanded(index);
        }
      } else {
        go(slug);
      }
    },
    [isCoarse, mobileExpanded, go],
  );

  const expandedIndex = isCoarse ? mobileExpanded : hoveredIndex;
  const hasFocus = expandedIndex !== null;

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
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
                      padding: "24px 20px"
                    }}
                  >
                    <span style={{
                      color: "#fff", background: COLORS.secondary, padding: "5px 12px",
                      borderRadius: 999, fontSize: 10, fontWeight: 700,
                      fontFamily: "'Montserrat', sans-serif", letterSpacing: 2,
                      textTransform: "uppercase", alignSelf: "flex-start", marginBottom: 10
                    }}>
                      {item.tag}
                    </span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff",
                      fontWeight: 700, margin: 0, textShadow: "0 2px 14px rgba(0,0,0,0.45)"
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
              width: 100%;
              aspect-ratio: 1 / 1;
              border-radius: 20px;
              overflow: hidden;
              position: relative;
            }
            .destination-card img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .swiper-slide {
              transform: scale(0.9);
              opacity: 0.6;
              transition: all 0.3s ease;
            }
            .swiper-slide-active {
              transform: scale(1);
              opacity: 1;
            }
          `}</style>
        </div>
      ) : (
        <div
          className="travel-gallery-bars-wrap"
          style={{
            width: "100%",
            display: isCoarse ? "flex" : "block",
            justifyContent: isCoarse ? "center" : undefined,
            overflowX: isCoarse ? "auto" : "visible",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            paddingBottom: isCoarse ? 8 : 0,
          }}
        >
      <div
        className="travel-gallery-bars"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start",
          gap: 10,
          minHeight: isCoarse ? 320 : 360,
          maxHeight: isCoarse ? 380 : 400,
          width: isCoarse ? "max-content" : "100%",
          margin: "0 auto",
          padding: isCoarse ? "4px 4px 12px" : 0,
          scrollSnapType: isCoarse ? "x mandatory" : "none",
        }}
      >
        {destinations.map((dest, i) => {
          const isExpanded = expandedIndex === i;
          const dimOthers = hasFocus && !isExpanded;

          return (
            <div
              key={dest.slug}
              role="button"
              tabIndex={0}
              onClick={() => handleBarActivate(dest.slug, i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleBarActivate(dest.slug, i);
                }
              }}
              onMouseEnter={() => !isCoarse && setHoveredIndex(i)}
              onMouseLeave={() => !isCoarse && setHoveredIndex(null)}
              style={{
                position: "relative",
                flex: isCoarse
                  ? "0 0 auto"
                  : hasFocus
                    ? isExpanded
                      ? "3.2 1 0%"
                      : "0.55 1 0%"
                    : "1 1 0%",
                width: isCoarse ? (isExpanded ? 280 : 72) : undefined,
                minWidth: isCoarse ? (isExpanded ? 260 : 64) : hasFocus ? (isExpanded ? 280 : 52) : 64,
                maxWidth: isCoarse
                  ? isExpanded
                    ? 300
                    : 88
                  : hasFocus
                    ? isExpanded
                      ? 400
                      : 100
                    : undefined,
                cursor: "pointer",
                borderRadius: 20,
                overflow: "hidden",
                scrollSnapAlign: isCoarse ? "start" : undefined,
                filter: dimOthers ? "brightness(0.55) blur(1px)" : "brightness(1) blur(0)",
                opacity: dimOthers ? 0.88 : 1,
                transition:
                  "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.45s ease, opacity 0.45s ease, transform 0.35s ease",
                boxShadow: isExpanded
                  ? "0 16px 40px rgba(30,58,138,0.22)"
                  : "4px 8px 20px rgba(0,0,0,0.08)",
                transform: isExpanded ? "scale(1.01)" : "scale(1)",
                outline: "none",
              }}
            >
              <img
                src={dest.img}
                alt=""
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: isExpanded ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isExpanded
                    ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, transparent 85%)",
                  transition: "opacity 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: COLORS.secondary,
                  padding: "5px 12px",
                  borderRadius: 999,
                  opacity: isExpanded ? 1 : 0.92,
                  transition: "opacity 0.35s ease",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: 9,
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {dest.tag}
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: isExpanded ? "20px 18px 22px" : "14px 10px 16px",
                  textAlign: "left",
                  opacity: isExpanded || !hasFocus ? 1 : 0.85,
                  transition: "opacity 0.35s ease, padding 0.45s ease",
                  pointerEvents: "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isExpanded ? "clamp(18px, 2vw, 26px)" : 14,
                    color: "#fff",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: 6,
                    textShadow: "0 2px 14px rgba(0,0,0,0.45)",
                  }}
                >
                  {dest.name}
                </h3>
                {isExpanded && (
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {isCoarse ? "Tap again to open" : "Explore"} <span style={{ fontSize: 13 }}>→</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
      )}
    </>
  );
}

