import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import logo from "./assets/logo.png";
import whiteLogo from "./assets/White logo.png";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import DestinationCarousel from "./components/DestinationCarousel";
import TravelGalleryBars from "./components/TravelGalleryBars";
import DestinationPage from "./pages/DestinationPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationList from "./pages/DestinationList";
import PackagePage from "./pages/PackagePage";
import AboutPage from "./pages/AboutPage";
import FilteredPackagesPage from "./pages/FilteredPackagesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import destinations from "./data/destinations";
import stockImages from "./data/stockImages";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const COLORS = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  secondary: "#F97316",
  secondaryLight: "#FB923C",
  dark: "#1a1a2e",
  muted: "#64748b",
  bg: "#ffffff",
  bgAlt: "#f1f5f9",
  bgAlt2: "#e2e8f0",
  cardBg: "#ffffff",
};

const CLAY = {
  card: {
    background: COLORS.cardBg,
    borderRadius: 20,
    boxShadow: "8px 8px 20px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.04)",
  },
  cardHover: {
    boxShadow: "10px 10px 28px rgba(30,58,138,0.12), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
    border: `1px solid rgba(30,58,138,0.15)`,
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const testimonials = [
  { name: "Priya Sharma", role: "Honeymooner", text: "WE PLAN TRIPS curated the most magical Bali itinerary for us. Every detail was perfect — the private villa, sunset dinner, cultural tours. Absolutely unforgettable.", avatar: "PS", rating: 5 },
  { name: "Rahul Mehta", role: "Adventure Traveller", text: "The Northern Lights trip exceeded all expectations. Waking up to aurora borealis in a glass igloo was life-changing. WE PLAN TRIPS made it effortless.", avatar: "RM", rating: 5 },
  { name: "Sneha & Arjun", role: "Anniversary Couple", text: "Greece was a dream! Santorini's blue domes, Mykonos nights — WE PLAN TRIPS's premium service made our anniversary genuinely special.", avatar: "SA", rating: 5 },
  { name: "Vikram Nair", role: "Solo Explorer", text: "Japan solo trip with WE PLAN TRIPS was flawlessly planned. From cherry blossoms in Kyoto to ramen in Tokyo — every recommendation was spot on.", avatar: "VN", rating: 5 },
];

const heroDestinations = [
  { name: "Bali", country: "Indonesia", tagline: "Island of the Gods", img: stockImages.bali.hero, slug: "bali" },
  { name: "Dubai", country: "UAE", tagline: "City of Gold & Grandeur", img: stockImages.dubai.hero, slug: "dubai" },
  { name: "Northern Lights", country: "Scandinavia", tagline: "Nature's Greatest Light Show", img: stockImages["northern-lights"].hero, slug: "northern-lights" },
  { name: "Japan", country: "Japan", tagline: "Where Tradition Meets Tomorrow", img: stockImages.japan.hero, slug: "japan" },
  { name: "Greece", country: "Greece", tagline: "Sunsets Over the Aegean", img: stockImages.greece.hero, slug: "greece" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const NAV_HEIGHT = 72;

function NavbarSearch({ navSolid }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderFade, setPlaceholderFade] = useState(true);
  const navigate = useNavigate();

  const searchSuggestions = destinations.map(d => `Search ${d.name}...`);

  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholderFade(false);
      setTimeout(() => {
        setPlaceholderIndex(i => (i + 1) % searchSuggestions.length);
        setPlaceholderFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, [searchSuggestions.length]);

  const results = query.length > 0
    ? destinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <div className="navbar-search" style={{ position: "relative", flex: "1 1 0", maxWidth: 420, margin: "0 12px", minWidth: 0 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: navSolid ? COLORS.bgAlt : "rgba(255,255,255,0.15)",
        borderRadius: 50, padding: "6px 6px 6px 18px",
        border: navSolid ? `1px solid ${COLORS.bgAlt2}` : "1px solid rgba(255,255,255,0.2)",
        backdropFilter: navSolid ? "none" : "blur(12px)",
        transition: "all 0.4s",
      }}>
        <span style={{ fontSize: 16, color: navSolid ? COLORS.muted : "rgba(255,255,255,0.7)", transition: "color 0.3s" }}>🔍</span>
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            style={{
              width: "100%", border: "none", outline: "none", background: "transparent",
              fontFamily: "'Montserrat', sans-serif", fontSize: 13,
              color: navSolid ? COLORS.dark : "#fff",
              padding: "8px 0", transition: "color 0.3s",
            }}
          />
          {query.length === 0 && (
            <span className="nav-search-placeholder" style={{
              position: "absolute", left: 0, top: "50%",
              fontFamily: "'Montserrat', sans-serif", fontSize: 13,
              color: navSolid ? COLORS.muted : "rgba(255,255,255,0.55)",
              pointerEvents: "none", transition: "color 0.3s, opacity 0.3s, transform 0.3s",
              opacity: placeholderFade ? 1 : 0,
              transform: placeholderFade ? "translateY(-50%)" : "translateY(-70%)",
            }}>
              {searchSuggestions[placeholderIndex]}
            </span>
          )}
        </div>
      </div>

      {/* Dropdown results */}
      {focused && results.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
          background: COLORS.bg, borderRadius: 16, padding: "8px 0",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.06)",
          maxHeight: 300, overflow: "auto", zIndex: 200,
        }}>
          {results.map(d => (
            <button key={d.slug}
              onMouseDown={() => { setQuery(""); navigate(`/destination/${d.slug}`); }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                width: "100%", padding: "10px 18px", border: "none",
                background: "transparent", cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif", fontSize: 13,
                color: COLORS.dark, textAlign: "left", transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = COLORS.bgAlt}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              <img src={d.cardImg} alt={d.name} style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                <div style={{ fontSize: 10, color: COLORS.muted, letterSpacing: 1 }}>{d.country}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const priceRanges = [
  { label: "Under \u20B950K", path: "/packages?price=under-50k" },
  { label: "\u20B950K\u2013\u20B91L", path: "/packages?price=50k-1l" },
  { label: "\u20B91L\u2013\u20B91.5L", path: "/packages?price=1l-1.5l" },
  { label: "\u20B91.5L\u2013\u20B92L", path: "/packages?price=1.5l-2l" },
  { label: "\u20B92L+", path: "/packages?price=above-2l" },
];

const NAV_DESTINATIONS = [
  { name: "Bali", country: "Indonesia", slug: "bali" },
  { name: "Dubai", country: "UAE", slug: "dubai" },
  { name: "Maldives", country: "Maldives", slug: "maldives" },
  { name: "Thailand", country: "Thailand", slug: "thailand" },
  { name: "Switzerland", country: "Switzerland", slug: "switzerland" },
  { name: "Goa", country: "India", slug: "goa" },
  { name: "Greece", country: "Greece", slug: "greece" },
  { name: "Japan", country: "Japan", slug: "japan" },
  { name: "Singapore", country: "Singapore", slug: "singapore" },
  { name: "Mauritius", country: "Mauritius", slug: "mauritius" },
  { name: "Northern Lights", country: "Scandinavia", slug: "northern-lights" },
  { name: "Almaty", country: "Kazakhstan", slug: "almaty" },
];

function Navbar() {
  // 1. USE STATE PROPERLY
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [pkgOpen, setPkgOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobilePkgOpen, setMobilePkgOpen] = useState(false);
  const destTimeout = useRef(null);
  const pkgTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const isHeroRoute =
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/destination/");

  // 2. HANDLE INITIAL LOAD CORRECTLY (CRITICAL FIX)
  useEffect(() => {
    const handleScroll = () => {
      // 7. DEBUG CHECK (MANDATORY)
      console.log("scrollY:", window.scrollY);
      setScrollY(window.scrollY);

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // 3. ADD EVENT LISTENER
    window.addEventListener("scroll", handleScroll);

    // Call IMMEDIATELY inside useEffect
    handleScroll();

    // 5. FORCE RESET ON LOAD (VERY IMPORTANT)
    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
      handleScroll();
    });

    // 4. CLEANUP
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // 9. OPTIONAL (FOR REACT ROUTER)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // APPLY CLASS CONDITIONALLY (Logic for navSolid)
  // We keep !isHeroRoute to ensure non-hero pages are white
  const navSolid = scrolled || !isHeroRoute;
  const showWhiteLogo = scrollY === 0 && isHeroRoute;

  const baseLinkColor = navSolid ? COLORS.primary : "rgba(255,255,255,0.9)";

  return (
    <nav className={`navbar ${navSolid ? "scrolled" : ""}`} style={{
      fontFamily: "'Montserrat', sans-serif",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s",
      background: navSolid ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: navSolid ? "blur(16px)" : "none",
      borderBottom: navSolid ? "1px solid rgba(30,58,138,0.1)" : "none",
      boxShadow: navSolid ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      padding: "0 5vw",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: NAV_HEIGHT, gap: 12 }}>
        {/* Logo — white at top on hero routes, standard logo after scroll */}
        <Link
          to="/"
          className="nav-logo-link"
          style={{
            position: "relative",
            display: "block",
            height: 52,
            width: 148,
            flexShrink: 0,
            textDecoration: "none",
            animation: "logoFadeInScale 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
          }}
        >
          <img
            src={whiteLogo}
            alt=""
            aria-hidden
            className="nav-logo"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: 52,
              width: "auto",
              maxWidth: 160,
              objectFit: "contain",
              opacity: showWhiteLogo ? 1 : 0,
              transformOrigin: "left center",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              pointerEvents: "none",
            }}
          />
          <img
            src={logo}
            alt="We Plan Trips"
            className="nav-logo"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: `translateY(-50%) scale(${showWhiteLogo ? 0.96 : 1})`,
              height: 52,
              width: "auto",
              maxWidth: 160,
              objectFit: "contain",
              opacity: showWhiteLogo ? 0 : 1,
              transformOrigin: "left center",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          />
        </Link>
        {/* Center: Search bar */}
        <NavbarSearch navSolid={navSolid} />
        {/* Desktop Links with Dropdowns */}
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexShrink: 0 }} className="desktop-nav">

          {/* DESTINATIONS */}
          <div
            onMouseEnter={() => { clearTimeout(destTimeout.current); setDestOpen(true); }}
            onMouseLeave={() => { destTimeout.current = setTimeout(() => setDestOpen(false), 180); }}
            style={{ position: "relative" }}
          >
            <Link to="/destinations" className="nav-link-hover" style={{
              color: destOpen ? COLORS.secondary : baseLinkColor,
              textDecoration: "none", fontSize: 12, letterSpacing: 2,
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
              transition: "color 0.3s", textTransform: "uppercase",
              whiteSpace: "nowrap", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              Destinations
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.3s", transform: destOpen ? "rotate(180deg)" : "rotate(0)" }}>
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {/* Destinations Dropdown */}
            {destOpen && (
              <ul className="destinations-dropdown" style={{
                position: "absolute", top: "100%", left: 0,
                background: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                borderRadius: 12,
                zIndex: 300,
                listStyle: "none",
                display: "block",
              }}>
                {[
                  { name: "Bali", slug: "bali" },
                  { name: "Thailand", slug: "thailand" },
                  { name: "Dubai", slug: "dubai" },
                  { name: "Maldives", slug: "maldives" }
                ].map((item) => (
                  <li 
                    key={item.slug}
                    onClick={() => { setDestOpen(false); navigate(`/destination/${item.slug}`); }}
                    style={{ transition: "0.2s" }}
                  >
                    {item.name}
                  </li>
                ))}
                <li 
                  className="view-all" 
                  onClick={() => { setDestOpen(false); navigate("/destinations"); }}
                  style={{ borderTop: "1px solid #eee", marginTop: 4, fontWeight: 700 }}
                >
                  View All
                </li>
              </ul>
            )}

          </div>

          {/* HOLIDAY PACKAGES */}
          <div
            onMouseEnter={() => { clearTimeout(pkgTimeout.current); setPkgOpen(true); }}
            onMouseLeave={() => { pkgTimeout.current = setTimeout(() => setPkgOpen(false), 180); }}
            style={{ position: "relative" }}
          >
            <span className="nav-link-hover" style={{
              color: pkgOpen ? COLORS.secondary : baseLinkColor,
              textDecoration: "none", fontSize: 12, letterSpacing: 2,
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
              transition: "color 0.3s", textTransform: "uppercase",
              whiteSpace: "nowrap", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              Holiday Packages
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.3s", transform: pkgOpen ? "rotate(180deg)" : "rotate(0)" }}>
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {/* Package Dropdown */}
            {pkgOpen && (
              <ul className="package-dropdown" style={{
                position: "absolute", top: "100%", left: 0,
                background: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                borderRadius: 12,
                zIndex: 300,
                listStyle: "none",
              }}>
                {[
                  { label: "Under ₹50K", path: "/packages?price=under-50k" },
                  { label: "₹50K–₹1L", path: "/packages?price=50k-1l" },
                  { label: "₹1L–₹1.5L", path: "/packages?price=1l-1.5l" },
                  { label: "₹1.5L–₹2L", path: "/packages?price=1.5l-2l" }
                ].map((pr) => (
                  <li 
                    key={pr.path}
                    onClick={() => { setPkgOpen(false); navigate(pr.path); }}
                  >
                    {pr.label}
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* ABOUT US */}
          <Link to="/about" className="nav-link-hover" style={{
            color: baseLinkColor,
            textDecoration: "none", fontSize: 12, letterSpacing: 2,
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
            transition: "color 0.3s", textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>About Us</Link>

        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          color: navSolid ? COLORS.primary : "#fff", fontSize: 24, cursor: "pointer",
          transition: "color 0.3s", flexShrink: 0,
        }} className="hamburger">☰</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(255,255,255,0.98)", padding: "12px 5vw 16px",
          borderTop: `1px solid ${COLORS.bgAlt2}`,
          borderRadius: "0 0 16px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          maxWidth: 1400, margin: "0 auto",
        }}>
          {/* Destinations accordion */}
          <button onClick={() => setMobileDestOpen(!mobileDestOpen)} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
            color: COLORS.primary, padding: "14px 24px", border: "none", background: "transparent",
            fontSize: 14, letterSpacing: 2, fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
            textTransform: "uppercase", cursor: "pointer",
          }}>
            <span>Destinations</span>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.3s", transform: mobileDestOpen ? "rotate(180deg)" : "rotate(0)" }}>
              <path d="M2 4L5 7L8 4" stroke={COLORS.primary} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {mobileDestOpen && (
            <div style={{ padding: "0 24px 8px 36px" }}>
              <Link to="/destinations"
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "8px 0", color: COLORS.secondary, fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: "'Montserrat', sans-serif" }}
              >View All Destinations →</Link>
              {NAV_DESTINATIONS.map(d => (
                <a key={d.slug} href={`/destination/${d.slug}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "8px 0", color: COLORS.muted, fontSize: 13, textDecoration: "none", fontFamily: "'Montserrat', sans-serif" }}
                >{d.name}</a>
              ))}
            </div>
          )}

          {/* Holiday Packages accordion */}
          <button onClick={() => setMobilePkgOpen(!mobilePkgOpen)} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
            color: COLORS.primary, padding: "14px 24px", border: "none", background: "transparent",
            fontSize: 14, letterSpacing: 2, fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
            textTransform: "uppercase", cursor: "pointer",
          }}>
            <span>Holiday Packages</span>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.3s", transform: mobilePkgOpen ? "rotate(180deg)" : "rotate(0)" }}>
              <path d="M2 4L5 7L8 4" stroke={COLORS.primary} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {mobilePkgOpen && (
            <div style={{ padding: "0 24px 8px 36px" }}>
              {priceRanges.map(pr => (
                <a key={pr.path} href={pr.path}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "8px 0", color: COLORS.muted, fontSize: 13, textDecoration: "none", fontFamily: "'Montserrat', sans-serif" }}
                >{pr.label}</a>
              ))}
            </div>
          )}

          {/* About Us */}
          <a href="/about" onClick={() => setMenuOpen(false)} style={{
            display: "block", color: COLORS.primary, padding: "14px 24px",
            textDecoration: "none", fontSize: 14, letterSpacing: 2,
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
            textTransform: "uppercase",
          }}>About Us</a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} .hamburger{display:block!important} }
        @media(max-width:1100px){ .navbar-search { max-width: 280px !important; } }
        @media(max-width:900px){ .navbar-search { max-width: 200px !important; } }
        @media(max-width:768px){ .navbar-search { max-width: none!important; margin: 0 8px!important; } .navbar-search input { font-size: 12px!important; } .nav-search-placeholder { font-size: 11px!important; } }
        .nav-link-hover:hover { color: ${COLORS.secondary} !important; }

        /* Destinations Dropdown */
        .destinations-dropdown {
          padding: 8px 12px;
          min-width: 160px;
        }

        .destinations-dropdown li {
          padding: 6px 10px;
          font-size: 14px;
          color: ${COLORS.dark};
          cursor: pointer;
        }

        .destinations-dropdown li:hover {
          background: #f5f5f5;
          color: ${COLORS.secondary} !important;
        }

        /* Package Dropdown */
        .package-dropdown {
          display: flex;
          gap: 8px;
          padding: 10px;
          max-width: 300px;
          flex-wrap: wrap;
        }

        .package-dropdown li {
          padding: 6px 12px;
          border-radius: 20px;
          background: #f5f5f5;
          font-size: 13px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
          color: ${COLORS.dark};
        }

        .package-dropdown li:hover {
          background: #ff7a00;
          color: white !important;
        }
      `}</style>

    </nav>
  );
}

// ─── HERO DESTINATIONS ───────────────────────────────────────────────────────

function HeroDestinations() {
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setSlide(s => (s + 1) % heroDestinations.length); setFade(true); }, 600);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goToSlide = (i) => {
    if (i === slide) return;
    setFade(false);
    setTimeout(() => { setSlide(i); setFade(true); }, 300);
  };

  const d = heroDestinations[slide];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 650, overflow: "hidden" }}>
      {/* Current slide bg */}
      <div style={{ position: "absolute", inset: 0, transition: "opacity 0.8s ease", opacity: fade ? 1 : 0 }}>
        <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
      </div>

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />

      {/* Slide content — LEFT ALIGNED */}
      <div className="hero-content" style={{
        position: "relative", zIndex: 4, height: "100%", display: "flex",
        flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
        textAlign: "left", padding: "0 8vw",
      }}>
        <div style={{
          fontSize: 12, letterSpacing: 6, color: COLORS.secondary,
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          marginBottom: 14, textTransform: "uppercase",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          transitionDelay: "0.1s",
        }}>
          ✦ {d.country} ✦
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(52px, 9vw, 120px)", color: "#fff",
          lineHeight: 0.95, fontWeight: 700, marginBottom: 16,
          textShadow: "0 4px 30px rgba(0,0,0,0.35)",
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          transitionDelay: "0.2s",
        }}>
          {d.name}
        </h1>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 2vw, 20px)", color: "rgba(255,255,255,0.85)",
          maxWidth: 500, lineHeight: 1.6,
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          transitionDelay: "0.35s",
          marginBottom: 32,
        }}>
          {d.tagline}
        </p>

        <button
          onClick={() => navigate("/destinations")}
          style={{
            background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
            color: "#fff", border: "none", padding: "16px 44px", borderRadius: 50,
            fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
            letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
            boxShadow: "0 10px 30px rgba(249,115,22,0.35)",
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s ease, background 0.3s, transform 0.3s",
            transitionDelay: "0.45s",
          }}
          onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 15px 40px rgba(249,115,22,0.45)"; }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 10px 30px rgba(249,115,22,0.35)"; }}
        >
          Start Planning
        </button>
      </div>

      {/* Side navigation: vertical dots */}
      <div className="hero-side-dots" style={{
        position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14, zIndex: 10,
      }}>
        {heroDestinations.map((dest, i) => (
          <button key={i} onClick={() => goToSlide(i)} style={{
            width: i === slide ? 14 : 10,
            height: i === slide ? 14 : 10,
            borderRadius: "50%",
            background: i === slide ? COLORS.secondary : "rgba(255,255,255,0.5)",
            border: i === slide ? `2px solid #fff` : "2px solid transparent",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: i === slide ? "0 0 12px rgba(249,115,22,0.6)" : "none",
          }}
            title={dest.name}
          />
        ))}
      </div>



      {/* Slide counter */}
      <div className="hero-counter" style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: 3,
        color: "rgba(255,255,255,0.5)", zIndex: 5,
      }}>
        {String(slide + 1).padStart(2, "0")} / {String(heroDestinations.length).padStart(2, "0")}
      </div>

      <style>{`
        @media(max-width: 768px) { .hero-dest-strip { display: none !important; } }
      `}</style>
    </section>
  );
}

// SearchBar removed — now integrated into Navbar as NavbarSearch

// ─── SECTION TITLE ───────────────────────────────────────────────────────────

function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 58px)", color: COLORS.dark, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ─── DESTINATION GALLERY (Scrollable Mosaic) ─────────────────────────────────

const galleryDestinations = [
  { name: "Bali", slug: "bali", tag: "Romance", img: stockImages.bali.hero },
  { name: "Dubai", slug: "dubai", tag: "Luxury", img: stockImages.dubai.hero },
  { name: "Northern Lights", slug: "northern-lights", tag: "Magical", img: stockImages["northern-lights"].hero },
  { name: "Japan", slug: "japan", tag: "Culture", img: stockImages.japan.hero },
  { name: "Greece", slug: "greece", tag: "History", img: stockImages.greece.hero },
  { name: "Singapore", slug: "singapore", tag: "Modern", img: stockImages.singapore.hero },
  { name: "Mauritius", slug: "mauritius", tag: "Beach", img: stockImages.mauritius.hero },
  { name: "Hong Kong", slug: "hong-kong", tag: "City", img: stockImages["hong-kong"].hero },
  { name: "Almaty", slug: "almaty", tag: "Adventure", img: stockImages.almaty.hero },
];

function DestinationGallery() {
  return (
    <section id="packages" style={{ background: COLORS.bg, padding: "90px 5vw" }}>
      <SectionTitle
        tag="✦ Explore Destinations"
        title="Travel Gallery"
      />


      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <TravelGalleryBars destinations={galleryDestinations} />
      </div>
    </section>
  );
}

// ─── EXPERIENCES ─────────────────────────────────────────────────────────────

function ExperienceCard({ item, index, visible }) {
  return (
    <div
      className="exp-card"
      style={{
        position: "relative", overflow: "hidden", borderRadius: 24,
        aspectRatio: "3 / 4",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s ${index * 0.15}s`,
        cursor: "default",
        boxShadow: "10px 10px 30px rgba(0,0,0,0.1), -4px -4px 14px rgba(255,255,255,0.7)",
        border: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      {/* Background image */}
      <img
        src={item.img}
        alt={item.title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
        className="exp-card-img"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.5) 40%, rgba(15,23,42,0.15) 100%)",
      }} />
      {/* Accent border on hover - top line */}
      <div className="exp-card-accent" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primaryLight})`,
        transform: "scaleX(0)", transformOrigin: "left",
        transition: "transform 0.4s ease",
      }} />
      {/* Number badge */}
      <div style={{
        position: "absolute", top: 24, left: 24,
        fontFamily: "'Playfair Display', serif",
        fontSize: 64, fontWeight: 700,
        color: "rgba(255,255,255,0.08)",
        lineHeight: 1,
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "32px 28px",
      }}>
        <div className="exp-card-icon" style={{
          width: 48, height: 48, borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 18,
          boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
          transition: "transform 0.3s ease",
        }}>
          {item.icon}
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 2vw, 26px)", color: "#fff",
          fontWeight: 700, lineHeight: 1.2, marginBottom: 10,
        }}>
          {item.title}
        </h3>
        <p className="exp-card-desc" style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.6)", lineHeight: 1.7,
          maxHeight: 0, overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.4s ease",
          opacity: 0,
        }}>
          {item.desc}
        </p>
      </div>

      <style>{`
        .exp-card:hover .exp-card-img { transform: scale(1.08); }
        .exp-card:hover .exp-card-accent { transform: scaleX(1) !important; }
        .exp-card:hover .exp-card-icon { transform: translateY(-4px); }
        .exp-card:hover .exp-card-desc { max-height: 100px !important; opacity: 1 !important; }
      `}</style>
    </div>
  );
}

function Experiences() {
  const [ref, visible] = useScrollAnimation();
  const items = [
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15l2 2 4-4" /></svg>, title: "Special Activities", desc: "Snorkeling, hiking, skydiving — we book the extraordinary experiences you'll remember forever.", img: stockImages.bali.gallery[0] },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>, title: "Private Travel Planning", desc: "Bespoke itineraries crafted around your every preference by expert travel designers.", img: stockImages.dubai.gallery[0] },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, title: "Luxury Tours", desc: "Curated stays at the world's finest hotels, resorts, and hidden boutique retreats.", img: stockImages.greece.gallery[0] },
    { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><line x1="2" y1="12" x2="22" y2="12" /></svg>, title: "Best Destinations", desc: "Expertly vetted bucket-list destinations across 40+ countries, handpicked for you.", img: stockImages.japan.gallery[0] },
  ];
  return (
    <section ref={ref} id="tours" style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Why Choose Us" title="The WE PLAN TRIPS Experience" sub="Four pillars that make every journey with us truly unforgettable." />
      <div className="experiences-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
        maxWidth: 1200, margin: "0 auto",
      }}>
        {items.map((item, i) => (
          <ExperienceCard key={item.title} item={item} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}



// ─── VIDEO SECTION ────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section style={{ position: "relative", height: 520, overflow: "hidden" }}>
      <img src={stockImages.dubai.gallery[1]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", marginBottom: 28, transition: "all 0.3s",
          backdropFilter: "blur(4px)",
        }}
          onMouseOver={e => { e.currentTarget.style.background = `${COLORS.primary}cc`; e.currentTarget.style.border = `2px solid ${COLORS.primary}`; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.border = "2px solid rgba(255,255,255,0.6)"; }}>
          <span style={{ color: "#fff", fontSize: 26, paddingLeft: 6 }}>▶</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 60px)", color: "#fff", fontWeight: 700, textAlign: "center" }}>Experience the Journey</h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: 2, marginTop: 12 }}>WATCH OUR TRAVEL STORY</p>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollAnimation();
  return (
    <section ref={ref} style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Guest Stories" title="What Our Travellers Say" />
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <div key={t.name} style={{ display: i === active ? "block" : "none", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.6s" }}>
            <div style={{ fontSize: 48, color: COLORS.primary, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, marginBottom: 20 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 26px)", color: COLORS.dark, lineHeight: 1.6, fontStyle: "italic", marginBottom: 36 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.dark, fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted, fontSize: 11, letterSpacing: 2 }}>{t.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 16 }}>
              {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: COLORS.secondary, fontSize: 16 }}>{s}</span>)}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 36 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 10, height: 10, borderRadius: 5,
              background: i === active ? COLORS.primary : COLORS.bgAlt2,
              border: "none", cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS (with count-up) ────────────────────────────────────────────────────

function useCountUp(target, visible, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const isFloat = target % 1 !== 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return value;
}

function StatItem({ icon, target, suffix, label, index, visible }) {
  const count = useCountUp(target, visible);
  return (
    <div style={{
      textAlign: "center", opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.6s ${index * 0.12}s`,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 52px)", color: "#fff", fontWeight: 700, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

function Stats() {
  const [ref, visible] = useScrollAnimation();
  const items = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, target: 500, suffix: "+", label: "Happy Travellers" },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>, target: 80, suffix: "+", label: "Destinations" },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /></svg>, target: 250, suffix: "+", label: "Packages" },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, target: 4.9, suffix: "", label: "Avg Rating" },
  ];
  return (
    <section ref={ref} className="stats-section" style={{
      background: `linear-gradient(135deg, ${COLORS.primary}, #2563eb)`,
      padding: "80px 5vw",
    }}>
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, maxWidth: 960, margin: "0 auto" }}>
        {items.map((s, i) => (
          <StatItem key={s.label} icon={s.icon} target={s.target} suffix={s.suffix} label={s.label} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ background: COLORS.bg, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Get In Touch" title="Contact Us" sub="Have a question or ready to plan your next adventure? Reach out to us." />
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="contact-card" style={{
          ...CLAY.card,
          padding: "40px 36px",
        }}>
          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Name</label>
              <input placeholder="Your name" style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Email</label>
              <input placeholder="your@email.com" type="email" style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Message</label>
              <textarea placeholder="Tell us about your dream trip..." rows={4} style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", resize: "vertical", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <button style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              color: "#fff", border: "none", padding: "14px 36px", borderRadius: 50,
              fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(30,58,138,0.3)", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 28px rgba(30,58,138,0.4)"; }}
              onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.3)"; }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const footerDestinations = [
    { name: "Bali", slug: "bali" },
    { name: "Dubai", slug: "dubai" },
    { name: "Japan", slug: "japan" },
    { name: "Greece", slug: "greece" },
    { name: "Switzerland", slug: "switzerland" },
    { name: "Thailand", slug: "thailand" },
    { name: "Turkey", slug: "turkey" },
    { name: "Paris", slug: "paris" },
  ];

  const quickLinks = [
    { name: "Holiday Packages", href: "/destinations" },
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <footer style={{ background: "#0f172a", borderTop: "none", padding: "70px 5vw 30px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: 40, marginBottom: 50, alignItems: "start" }}>
        {/* Left: Logo only */}
        <div className="footer-logo-col" style={{ display: "flex", alignItems: "flex-start" }}>
          <Link to="/">
            <img src={whiteLogo} alt="We Plan Trips" className="footer-logo" />
          </Link>
        </div>

        {/* Center: Destinations */}
        <div className="footer-dest-col" style={{ textAlign: "center" }}>
          <Link to="/destinations" style={{ textDecoration: "none" }}>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: COLORS.primaryLight, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Destinations</h4>
          </Link>
          <div className="footer-dest-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", justifyContent: "center" }}>
            {footerDestinations.map(d => (
              <Link key={d.slug} to={`/destination/${d.slug}`} style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 13, color: "rgba(255,255,255,0.45)",
                textDecoration: "none", transition: "color 0.2s",
                textAlign: "center",
              }}
                onMouseOver={e => e.target.style.color = COLORS.primaryLight}
                onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{d.name}</Link>
            ))}
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="footer-links-col" style={{ textAlign: "right" }}>
          <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: COLORS.primaryLight, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Quick Links</h4>
          {quickLinks.map(l => (
            <Link key={l.name} to={l.href} style={{
              display: "block", fontFamily: "'Montserrat', sans-serif",
              fontSize: 13, color: "rgba(255,255,255,0.45)",
              textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
            }}
              onMouseOver={e => e.target.style.color = COLORS.primaryLight}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{l.name}</Link>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 WE PLAN TRIPS. All rights reserved.</p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Crafted with ✦ for the curious traveller</p>
      </div>
    </footer>
  );
}

// ─── LEAD OVERLAY ────────────────────────────────────────────────────────────

function LeadOverlay() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", destination: "" });

  useEffect(() => {
    // Show overlay after 1.5s delay on first load
    const shown = sessionStorage.getItem("leadShown");
    if (!shown) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("leadShown", "1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = "service_jwdgmca";
    const TEMPLATE_ID = "template_qpk6mdk";
    const PUBLIC_KEY = "3R051NdGcwRqj5S1w";

    const templateParams = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      destination: form.destination,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSubmitted(true);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("leadShown", "1");
        }, 2200);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setSending(false);
        setError("Something went wrong. Please try again.");
      });
  };

  if (!visible) return null;

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
    fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
    outline: "none", transition: "border 0.3s", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(6px)",
      animation: "fadeIn 0.4s ease",
    }} onClick={handleClose}>
      <div onClick={e => e.stopPropagation()} className="lead-overlay-card" style={{
        background: COLORS.bg,
        borderRadius: 28,
        padding: "40px 36px",
        width: "90%", maxWidth: 440,
        boxShadow: "16px 16px 40px rgba(0,0,0,0.12), -8px -8px 24px rgba(255,255,255,0.6), inset 2px 2px 4px rgba(255,255,255,0.5)",
        border: "1px solid rgba(0,0,0,0.04)",
        position: "relative",
        animation: "slideUp 0.5s ease",
      }}>
        {/* Close button */}
        <button onClick={handleClose} style={{
          position: "absolute", top: 16, right: 16,
          background: COLORS.bgAlt, border: "none", borderRadius: "50%",
          width: 36, height: 36, cursor: "pointer",
          fontSize: 18, color: COLORS.muted,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
          onMouseOver={e => e.target.style.background = COLORS.bgAlt2}
          onMouseOut={e => e.target.style.background = COLORS.bgAlt}>
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✈️</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.dark, fontWeight: 700, marginBottom: 10 }}>Thank you!</h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.muted }}>We'll get back to you with the best travel options soon.</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.secondary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>✦ Plan Your Dream Trip</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: COLORS.dark, fontWeight: 700, lineHeight: 1.2 }}>Let's Start Planning</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: COLORS.muted, marginTop: 8 }}>Share your details and we'll curate the perfect trip for you.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              <input required placeholder="Your name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Phone number" type="tel" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Email address" type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Where do you want to visit?" value={form.destination}
                onChange={e => setForm({ ...form, destination: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              {error && <p style={{ color: "#ef4444", fontFamily: "'Montserrat', sans-serif", fontSize: 13, textAlign: "center", margin: 0 }}>{error}</p>}
              <button type="submit" disabled={sending} style={{
                background: sending ? "#94a3b8" : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                color: "#fff", border: "none", padding: "15px 36px", borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
                letterSpacing: 3, textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer",
                boxShadow: "0 6px 20px rgba(30,58,138,0.3)", transition: "all 0.2s",
                marginTop: 4, opacity: sending ? 0.7 : 1,
              }}
                onMouseOver={e => { if (!sending) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 28px rgba(30,58,138,0.4)"; } }}
                onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.3)"; }}>
                {sending ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <HeroDestinations />
      <div style={{ paddingTop: 40 }} />
      <DestinationCarousel destinations={destinations} />
      <Stats />
      <DestinationGallery />
      <Experiences />
      <VideoSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}

// ─── SPLASH LOADER ──────────────────────────────────────────────────────────

function SplashLoader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1800);
    const finish = setTimeout(() => onFinish(), 2300);
    return () => { clearTimeout(timer); clearTimeout(finish); };
  }, [onFinish]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#ffffff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.5s ease-out",
      pointerEvents: fadeOut ? "none" : "auto",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        border: "1px solid rgba(30,58,138,0.1)",
        animation: "loaderRing 3s linear infinite",
      }} />
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        border: "1px solid rgba(30,58,138,0.05)",
        animation: "loaderRing 4s linear infinite reverse",
      }} />

      {/* Flipping logo */}
      <div style={{
        width: 100, height: 100,
        animation: "logoFlip 1.6s ease-in-out infinite",
        perspective: 800,
        marginBottom: 32,
      }}>
        <img src={logo} alt="We Plan Trips" style={{
          width: "100%", height: "100%", objectFit: "contain",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
        }} />
      </div>

      {/* Brand text */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(16px, 4vw, 22px)",
        color: "#1a1a2e",
        letterSpacing: 8,
        fontWeight: 700,
        textAlign: "center",
        opacity: 0,
        animation: "loaderTextIn 0.8s ease-out 0.4s forwards",
      }}>
        WE PLAN YOU EXPLORE
      </div>

      {/* Subtle loading bar */}
      <div style={{
        width: 120, height: 3, borderRadius: 3,
        background: "rgba(30,58,138,0.05)",
        marginTop: 28, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 3,
          background: "linear-gradient(90deg, #F97316, #FB923C)",
          animation: "loaderBar 1.8s ease-in-out forwards",
        }} />
      </div>

      <style>{`
        @keyframes logoFlip {
          0%   { transform: perspective(800px) rotateY(0deg); }
          50%  { transform: perspective(800px) rotateY(180deg); }
          100% { transform: perspective(800px) rotateY(360deg); }
        }
        @keyframes loaderTextIn {
          from { opacity: 0; transform: translateY(12px); letter-spacing: 14px; }
          to   { opacity: 1; transform: translateY(0); letter-spacing: 8px; }
        }
        @keyframes loaderBar {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes loaderRing {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── ROUTES (offset below fixed navbar on non-hero pages) ───────────────────

function AppRoutes() {
  const location = useLocation();
  const padTop = (location.pathname === "/packages" || location.pathname.startsWith("/packages/")) ? NAV_HEIGHT : 0;
  return (
    <div style={{ paddingTop: padTop }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/destinations/:slug" element={<DestinationPage />} />
        <Route path="/destination/:slug" element={<DestinationPage />} />
        <Route path="/destination/:destSlug/package/:pkgSlug" element={<PackagePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/packages" element={<FilteredPackagesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      </Routes>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Smart scrollbar: show on scroll or when mouse near right edge
  useEffect(() => {
    let scrollTimer = null;
    const showScrollbar = () => {
      document.documentElement.classList.add("scrollbar-visible");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.documentElement.classList.remove("scrollbar-visible");
      }, 1200);
    };
    const handleScroll = () => showScrollbar();
    const handleMouseMove = (e) => {
      if (window.innerWidth - e.clientX < 30) showScrollbar();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;overscroll-behavior:none;}
        body{background:#ffffff;color:#1a1a2e;overflow-x:hidden;overscroll-behavior:none;}
        ::selection{background:rgba(30,58,138,0.2);}

        /* ─── MOBILE RESPONSIVE ──────────────────────── */
        @media(max-width: 768px) {
          /* Navbar logo stack */
          .nav-logo-link { height: 44px !important; width: 128px !important; }
          .nav-logo { height: 44px !important; max-width: 132px !important; }

          /* Hero */
          .hero-side-dots { display: none !important; }
          .hero-content { padding: 0 5vw !important; }
          .hero-content h1 { font-size: clamp(38px, 10vw, 52px) !important; }
          .hero-ticker { display: none !important; }
          .hero-counter { bottom: 30px !important; font-size: 10px !important; }

          /* Travel gallery bars — horizontal scroll on small screens */
          .travel-gallery-bars-wrap { overflow-x: auto !important; -webkit-overflow-scrolling: touch; }
          #packages > div:nth-child(2) > button:first-child { left: 4px !important; width: 38px !important; height: 38px !important; font-size: 16px !important; }
          #packages > div:nth-child(2) > button:nth-child(2) { right: 4px !important; width: 38px !important; height: 38px !important; font-size: 16px !important; }

          /* Experiences */
          .experiences-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .exp-card-desc { max-height: 80px !important; opacity: 1 !important; }

          /* Stats */
          .stats-section { padding: 50px 5vw !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }

          /* Contact */
          .contact-card { padding: 28px 20px !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-logo-col { justify-content: center !important; }
          .footer-dest-col { text-align: center !important; }
          .footer-links-col { text-align: center !important; }
          .footer-dest-grid { grid-template-columns: 1fr 1fr !important; gap: 8px 16px !important; }

          /* Promo banner & video section */
          section[style*="height: 380"] { height: 280px !important; }
          section[style*="height: 520"] { height: 340px !important; }

          /* Lead overlay */
          .lead-overlay-card { padding: 28px 20px !important; border-radius: 22px !important; max-height: 90vh !important; overflow-y: auto !important; }

          /* Section titles */
          section { padding-left: 4vw !important; padding-right: 4vw !important; }
        }

        @media(max-width: 480px) {
          /* Extra small devices */
          .hero-content h1 { font-size: clamp(32px, 11vw, 42px) !important; }
          .hero-counter { bottom: 20px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .experiences-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .footer-dest-grid { grid-template-columns: 1fr !important; }
        }
        .footer-logo { height: 70px !important; width: auto; max-width: 200px; object-fit: contain; }
      `}</style>
      {showLoader && <SplashLoader onFinish={() => setShowLoader(false)} />}
      <Navbar />
      <LeadOverlay />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}
