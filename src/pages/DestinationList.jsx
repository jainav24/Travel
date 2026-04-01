import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { destinationImages } from "../data/stockImages";

const COLORS = {
  primary: "#1E3A8A",
  secondary: "#F97316",
  dark: "#1a1a2e",
  muted: "#64748b",
  bg: "#ffffff",
};

const destinations = [
  { name: "Almaty", country: "Kazakhstan" },
  { name: "Australia", country: "Australia" },
  { name: "Netherland", country: "Netherlands" },
  { name: "Bali", country: "Indonesia" },
  { name: "Dubai", country: "UAE" },
  { name: "Greece", country: "Greece" },
  { name: "Hong Kong", country: "Hong Kong" },
  { name: "Italy", country: "Italy" },
  { name: "Japan", country: "Japan" },
  { name: "Malaysia", country: "Malaysia" },
  { name: "Mauritius", country: "Mauritius" },
  { name: "Maldives", country: "Maldives" },
  { name: "Northern Lights", country: "Scandinavia" },
  { name: "France", country: "France" },
  { name: "Singapore", country: "Singapore" },
  { name: "South Africa", country: "South Africa" },
  { name: "Spain", country: "Spain" },
  { name: "Switzerland", country: "Switzerland" },
  { name: "Thailand", country: "Thailand" },
  { name: "Turkey", country: "Turkey" },
  { name: "United Kingdom", country: "UK" },
  { name: "United States of America", country: "USA" },
  { name: "Vietnam", country: "Vietnam" }
];

export default function DestinationList() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.dark, fontFamily: "'Montserrat', sans-serif" }}>
      <style>{`
        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1440px;
          margin: 0 auto;
        }

        @media(max-width: 1100px) {
          .destinations-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media(max-width: 900px) {
          .destinations-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media(max-width: 600px) {
          .destinations-grid { grid-template-columns: repeat(1, 1fr); }
        }

        .destination-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 3/4;
          background: #333;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .destination-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .dest-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .destination-card:hover .dest-img {
          transform: scale(1.05);
        }

        .dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, transparent 100%);
          transition: background 0.4s ease;
        }

        .destination-card:hover .dest-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
        }

        .dest-text-wrapper {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          text-align: left;
        }

        .dest-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 2.5vw, 32px);
          color: #fff;
          font-weight: 700;
          margin: 0 0 6px 0;
          line-height: 1.1;
        }

        .dest-explore {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .dest-explore-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .destination-card:hover .dest-explore-arrow {
          transform: translateX(4px);
        }

        /* Hero styling consistency */
        .dest-hero {
          position: relative;
          height: 55vh;
          min-height: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #111;
          margin-bottom: 60px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="dest-hero">
        <img
          src={destinationImages["Dubai"]}
          alt="Destinations"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
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
          }}>
              ✦ Wanderlust ✦
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 72px)", color: "#fff", fontWeight: 700, marginBottom: 16 }}>
            Explore All Destinations
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>
            No flags, just premium travel stories.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ padding: "0 5vw 100px" }}>
        <div className="destinations-grid">
          {destinations.map((item, index) => {
            const imgSrc = destinationImages[item.name];
            const slug = item.name.toLowerCase().replace(/\s/g, "-");

            return (
              <div
                className="destination-card"
                key={index}
                onClick={() => navigate(`/destinations/${slug}`)}
              >
                <img src={imgSrc} alt={item.name} className="dest-img" />
                <div className="dest-overlay" />
                <div className="dest-text-wrapper">
                  <h3 className="dest-name">{item.name}</h3>
                  <div className="dest-explore">
                    Explore <span className="dest-explore-arrow">&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

