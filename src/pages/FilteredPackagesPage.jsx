import { useSearchParams, useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import destinations from "../data/destinations";
import PackageCard from "../components/PackageCard";

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

// Extract numeric price from string like "Per person starting from ₹42,650 excluding Flights"
function extractPrice(priceStr) {
  const match = priceStr.replace(/,/g, "").match(/₹([\d]+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const rangeConfig = {
  "under-50k": { min: 0, max: 50000, label: "International Packages Under \u20B950K" },
  "50k-1l": { min: 50000, max: 100000, label: "International Packages \u20B950K \u2013 \u20B91L" },
  "1l-1.5l": { min: 100000, max: 150000, label: "International Packages \u20B91L \u2013 \u20B91.5L" },
  "1.5l-2l": { min: 150000, max: 200000, label: "International Packages \u20B91.5L \u2013 \u20B92L" },
  "above-2l": { min: 200000, max: Infinity, label: "International Packages \u20B92L+" },
};

export default function FilteredPackagesPage() {
  const [searchParams] = useSearchParams();
  const priceRange = searchParams.get("price");
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activePill, setActivePill] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, [priceRange]);

  useEffect(() => {
    setActivePill("All");
  }, [priceRange]);

  const config = rangeConfig[priceRange];
  if (!config) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, background: COLORS.bg }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: COLORS.dark }}>Invalid Price Range</div>
        <button onClick={() => navigate("/")} style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          color: "#fff", border: "none", padding: "12px 36px", borderRadius: 50,
          fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
        }}>← Back Home</button>
      </div>
    );
  }

  const allFiltered = useMemo(() => {
    const list = [];
    destinations.forEach((dest) => {
      dest.packages.forEach((pkg) => {
        const price = extractPrice(pkg.price);
        if (price >= config.min && price <= config.max) {
          list.push({
            ...pkg,
            destinationSlug: dest.slug,
            destinationName: dest.name,
            listingImage: pkg.listingImage || dest.cardImg,
            destTag: dest.tag || "",
          });
        }
      });
    });
    return list;
  }, [config.max]);

  const pills = useMemo(
    () => ["All", "Honeymoon", "Best Selling", "Family Vacays", "Holidays", "Adventure", "Luxury"],
    [],
  );

  const filteredPackages = useMemo(() => {
    const tag = (p) => (p.destTag || "").toLowerCase();
    const title = (p) => (p.title || "").toLowerCase();

    let list = allFiltered;
    if (activePill !== "All") {
      list = allFiltered.filter((p) => {
        switch (activePill) {
          case "Honeymoon":
            return tag(p) === "romance" || /honeymoon|romantic|couple|wedding|anniversary/.test(title(p));
          case "Adventure":
            return tag(p) === "adventure" || /adventure|trek|safari|wildlife|ski/.test(title(p));
          case "Luxury":
            return /luxury|premium|private pool|private villa|exclusive|deluxe/.test(title(p)) || tag(p) === "luxury";
          case "Family Vacays":
            return /family|kids|children/.test(title(p)) || tag(p) === "family";
          case "Best Selling":
            return true;
          case "Holidays":
            return true;
          default:
            return true;
        }
      });
    }

    if (activePill === "Best Selling") {
      list = [...list].sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (activePill === "Holidays") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [allFiltered, activePill]);

  const breadcrumbLabel = config.label.replace(/^International Packages\s+/i, "").trim();

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      opacity: loaded ? 1 : 0,
      transform: loaded ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
    }}>
      <div style={{ padding: "32px 5vw 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(22px, 3.5vw, 32px)",
          fontWeight: 800,
          color: COLORS.primary,
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}>
          {config.label}
        </h1>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 13,
          color: COLORS.muted,
          marginBottom: 20,
        }}>
          <Link to="/" style={{ color: COLORS.muted, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px", color: COLORS.bgAlt2 }}>&gt;</span>
          <span>{breadcrumbLabel}</span>
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 8,
        }}>
          {pills.map((pill) => {
            const isOn = activePill === pill;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => setActivePill(pill)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `1px solid ${isOn ? COLORS.primary : COLORS.bgAlt2}`,
                  background: isOn ? `${COLORS.primary}12` : "#fff",
                  color: isOn ? COLORS.primary : "#475569",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "8px 5vw 80px", background: COLORS.bgAlt }}>
        {filteredPackages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: COLORS.dark, fontWeight: 700, marginBottom: 12 }}>
              No packages found
            </h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.muted }}>
              {activePill === "All"
                ? "We don't have packages in this price range yet. Try a different budget!"
                : "No packages match this filter for the selected budget. Try another category or All."}
            </p>
          </div>
        ) : (
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              maxWidth: 1000,
              margin: "0 auto",
              padding: "20px 0 40px",
            }} 
          >
            {filteredPackages.map((pkg, i) => (
              <PackageCard
                key={`${pkg.destinationSlug}-${pkg.slug || pkg.title}-${i}`}
                pkg={pkg}
                index={i}
                destinationSlug={pkg.destinationSlug}
                variant="horizontal-split" 
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: "0 5vw 40px", background: COLORS.bgAlt }}>
        <button onClick={() => navigate("/")} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "none", border: `1px solid ${COLORS.bgAlt2}`, borderRadius: 50,
          padding: "10px 24px", cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600,
          color: COLORS.primary, letterSpacing: 2, textTransform: "uppercase",
        }}
          onMouseOver={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = COLORS.primary; }}
          onMouseOut={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = COLORS.primary; e.currentTarget.style.borderColor = COLORS.bgAlt2; }}
        >← Back Home</button>
      </div>

    </div>
  );
}
