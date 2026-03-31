import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stockImages from "../data/stockImages";

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
  { name: "Netherlands", country: "Netherlands" },
  { name: "Bali", country: "Indonesia" },
  { name: "United Arab Emirates", country: "UAE" },
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
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .destination-card {
          padding: 20px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          text-align: center;
        }

        .destination-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .destination-card h3 {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: ${COLORS.primary};
          margin: 0 0 8px 0;
        }

        .destination-card p {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: ${COLORS.muted};
          margin: 0;
        }

        /* Hero styling consistency */
        .dest-hero {
          position: relative;
          height: 45vh;
          min-height: 350px;
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
          src={stockImages.dubai.hero}
          alt="Destinations"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 64px)", color: "#fff", fontWeight: 800, marginBottom: 16 }}>
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
          {destinations.map((item, index) => (
            <div
              className="destination-card"
              key={index}
              onClick={() => navigate(`/destinations/${item.name.toLowerCase().replace(/\s/g, "-")}`)}
            >
              <h3>{item.name}</h3>
              <p>{item.country}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
