import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import destinations from "../data/destinations";
import "./PackagePage.css";

const ICONS = {
    duration: "https://cdn-icons-png.flaticon.com/128/2784/2784459.png",
    calendar: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png",
    hotel: "https://cdn-icons-png.flaticon.com/128/2933/2933921.png",
    checkIn: "https://cdn-icons-png.flaticon.com/128/3652/3652267.png",
    checkOut: "https://cdn-icons-png.flaticon.com/128/3652/3652191.png",
    meals: "https://cdn-icons-png.flaticon.com/128/3480/3480823.png",
    location: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    included: "https://cdn-icons-png.flaticon.com/128/8832/8832138.png",
    excluded: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
    highlight: "https://cdn-icons-png.flaticon.com/128/7641/7641727.png",
    airplane: "https://cdn-icons-png.flaticon.com/128/3125/3125713.png",
    suitcase: "https://cdn-icons-png.flaticon.com/128/3460/3460335.png",
};

const DEST_IMAGES = {
    almaty: [
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
        "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
        "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    ],
    "hong-kong": [
        "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80",
        "https://images.unsplash.com/photo-1507941097613-9f80999190de?w=800&q=80",
        "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=800&q=80",
        "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
        "https://images.unsplash.com/photo-1576788369575-4ab045b9287e?w=800&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    ],
    greece: [
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
        "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
    ],
    malaysia: [
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
        "https://images.unsplash.com/photo-1548545083-efb5b40b5d96?w=800&q=80",
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
        "https://images.unsplash.com/photo-1623110703897-c68f45f48b52?w=800&q=80",
    ],
    singapore: [
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80",
        "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
        "https://images.unsplash.com/photo-1570610545900-f4b1880a0879?w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        "https://images.unsplash.com/photo-1506803682981-8e9a7f493d62?w=800&q=80",
    ],
    japan: [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
        "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    ],
    bali: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80",
        "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80",
        "https://images.unsplash.com/photo-1550438190-d8471f2f8822?w=800&q=80",
    ],
    dubai: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
        "https://images.unsplash.com/photo-1547226872-b7987f3f5e90?w=800&q=80",
        "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=80",
        "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80",
        "https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=800&q=80",
    ],
    "northern-lights": [
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&q=80",
        "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
        "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
        "https://images.unsplash.com/photo-1547236264-76b11fb29f64?w=800&q=80",
        "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    ],
};

export default function PackagePage() {
    const { destSlug, pkgSlug } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [activeDay, setActiveDay] = useState(0);

    const destination = destinations.find((d) => d.slug === destSlug);
    const pkg = destination?.packages.find((p) => p.slug === pkgSlug);
    const images = DEST_IMAGES[destSlug] || [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const t = setTimeout(() => setLoaded(true), 60);
        return () => clearTimeout(t);
    }, [destSlug, pkgSlug]);

    useEffect(() => { setActiveDay(0); }, [destSlug, pkgSlug]);

    if (!destination || !pkg) {
        return (
            <div className="pkgE-root pkgE-notfound">
                <h1>Package not found</h1>
                <button onClick={() => navigate("/")}>← Back Home</button>
            </div>
        );
    }

    const currentDay = pkg.itinerary?.[activeDay];

    return (
        <motion.div
            className="pkgE-root"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
        >
            {/* ══ HERO ══ */}
            <div className="pkgE-hero">
                <img src={destination.heroImg} alt={destination.name} className="pkgE-hero-img" />
                <div className="pkgE-hero-overlay" />
                <div className="pkgE-hero-overlay2" />



                <div className="pkgE-hero-content">

                    <h1 className="pkgE-hero-title">{pkg.title}</h1>
                    {pkg.destinationsCovered && (
                        <div className="pkgE-chips">
                            {pkg.destinationsCovered.map(d => (
                                <span key={d} className="pkgE-chip">{d}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* ── MOBILE INFO BRIDGE ── */}
            <div className="pkgE-mobile-info-bridge">
                <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                        <Clock size={20} color="#1E3A8A" strokeWidth={1.5} />
                    </div>
                    <p style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>Duration</p>
                    <h4 style={{ fontSize: 14, color: "#1a1a2e", fontWeight: 700, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>{pkg.duration}</h4>
                </div>
            </div>

            {/* Content wrapper with position relative to act as anchor for duration card */}
            <div style={{ position: "relative" }}>
                {/* ══ FLOATING INFO RIBBON ══ */}
                <div className="pkgE-ribbon duration-card" style={{ position: "absolute", right: "40px", top: "-30px", zIndex: 10, margin: 0 }}>
                    {[
                        { icon: ICONS.duration, label: "Duration", value: pkg.duration },
                    ].map((item, i) => (
                        <div key={i} className="pkgE-ribbon-item">
                            <div className="pkgE-ribbon-icon"><img src={item.icon} alt="" /></div>
                            <div>
                                <div className="pkgE-ribbon-label">{item.label}</div>
                                <div className="pkgE-ribbon-value">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ══ SPLIT: Gallery Mosaic + Highlights ══ */}
            {pkg.highlights && pkg.highlights.length > 0 && (
                <div className="pkgE-split">
                    {/* Left: Mosaic Gallery */}
                    <div className="pkgE-mosaic">
                        {images.slice(0, 3).map((img, i) => (
                            <div key={i} className="pkgE-mosaic-img">
                                <img src={img} alt={`${destination.name} ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                    {/* Right: Highlights */}
                    <div className="pkgE-highlights-side">
                        <div className="pkgE-section-label">Package Highlights</div>
                        <h2 className="pkgE-section-title">What Makes This Trip Special</h2>
                        {pkg.highlights.map((h, i) => (
                            <div key={i} className="pkgE-highlight-item">
                                <div className="pkgE-highlight-num">{String(i + 1).padStart(2, "0")}</div>
                                <p className="pkgE-highlight-text">{h}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ══ TAB-BASED ITINERARY ══ */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="pkgE-itin-section">
                    <div className="pkgE-itin-wrap">
                        <div className="pkgE-section-label">Day by Day</div>
                        <h2 className="pkgE-section-title">Your Itinerary</h2>

                        {/* Day tabs */}
                        <div className="pkgE-itin-tabs">
                            {pkg.itinerary.map((day, i) => (
                                <button
                                    key={i}
                                    className={`pkgE-itin-tab ${i === activeDay ? "active" : ""}`}
                                    onClick={() => setActiveDay(i)}
                                >
                                    Day {day.day}
                                </button>
                            ))}
                        </div>

                        {/* Active day content */}
                        {currentDay && (
                            <div className={`pkgE-itin-panel ${!images[activeDay] || currentDay.activities.length === 0 ? "no-image" : ""}`} key={activeDay}>
                                {/* Image */}
                                {images[activeDay] && currentDay.activities.length > 0 && (
                                    <div className="pkgE-itin-img-box">
                                        <img src={images[activeDay]} alt={currentDay.title} loading="lazy" />
                                    </div>
                                )}
                                {/* Content */}
                                <div className="pkgE-itin-content">
                                    <div className="pkgE-itin-day-badge">Day {currentDay.day}</div>
                                    <h3 className="pkgE-itin-title">{currentDay.title}</h3>
                                    <p className="pkgE-itin-desc">{currentDay.description}</p>
                                    {currentDay.activities.length > 0 && (
                                        <div className="pkgE-itin-acts">
                                            <div className="pkgE-itin-acts-title">Activities</div>
                                            {currentDay.activities.map((a, j) => (
                                                <div key={j} className="pkgE-itin-act-row">
                                                    <div className="pkgE-itin-act-dot" />
                                                    <span className="pkgE-itin-act-text">{a}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ══ GALLERY STRIP (remaining images) ══ */}
            {images.length > 3 && (
                <div className="pkgE-gallery-section">
                    <div className="pkgE-gallery-grid">
                        {images.slice(3, 6).map((img, i) => (
                            <div key={i} className="pkgE-gallery-card">
                                <img src={img} alt={`${destination.name} ${i + 4}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ══ STAY DETAILS ══ */}
            {(pkg.stays || pkg.stay) && (() => {
                const stayList = pkg.stays || (pkg.stay ? [pkg.stay] : []);
                return (
                    <div className="pkgE-stays-section">
                        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                            <div className="pkgE-section-label">
                                Your Accommodation{stayList.length > 1 ? "s" : ""}
                            </div>
                            <h2 className="pkgE-section-title">Stay Details</h2>
                            <div className="pkgE-stays-wrap">
                                {stayList.map((s, si) => (
                                    <div key={si} className="pkgE-stay-card">
                                        <div className="pkgE-stay-header">
                                            <img src={ICONS.hotel} alt="" />
                                            <div>
                                                <div className="pkgE-stay-name">{s.hotel}</div>
                                                {stayList.length > 1 && (
                                                    <div className="pkgE-stay-count">Stay {si + 1} of {stayList.length}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="pkgE-stay-grid">
                                            {[
                                                { icon: ICONS.duration, label: "Duration", value: s.nights },
                                                { icon: ICONS.checkIn, label: "Check-In", value: s.checkIn },
                                                { icon: ICONS.checkOut, label: "Check-Out", value: s.checkOut },
                                            ].map(item => (
                                                <div key={item.label} className="pkgE-stay-detail">
                                                    <img src={item.icon} alt="" />
                                                    <div>
                                                        <div className="pkgE-stay-detail-label">{item.label}</div>
                                                        <div className="pkgE-stay-detail-value">{item.value}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pkgE-stay-meals">
                                            <img src={ICONS.meals} alt="" />
                                            <span>{s.meals}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* ══ INCLUSIONS & EXCLUSIONS ══ */}
            <div className="pkgE-incexc-section">
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <div className="pkgE-section-label" style={{ textAlign: "center" }}>What's Covered</div>
                        <h2 className="pkgE-section-title" style={{ textAlign: "center" }}>Inclusions & Exclusions</h2>
                    </div>
                </div>
                <div className="pkgE-incexc-grid">
                    {pkg.inclusions && (
                        <div className="pkgE-incexc-card">
                            <div className="pkgE-inc-head">
                                <img src={ICONS.included} alt="" className="pkgE-incexc-head-icon" />
                                <h3 className="pkgE-incexc-head-title">What's Included</h3>
                            </div>
                            <div className="pkgE-incexc-list">
                                {pkg.inclusions.map((item, i) => (
                                    <div key={i} className="pkgE-incexc-row">
                                        <img src={ICONS.included} alt="" />
                                        <span className="pkgE-inc-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {pkg.exclusions && (
                        <div className="pkgE-incexc-card">
                            <div className="pkgE-exc-head">
                                <img src={ICONS.excluded} alt="" className="pkgE-incexc-head-icon" />
                                <h3 className="pkgE-incexc-head-title">What's Not Included</h3>
                            </div>
                            <div className="pkgE-incexc-list">
                                {pkg.exclusions.map((item, i) => (
                                    <div key={i} className="pkgE-incexc-row">
                                        <img src={ICONS.excluded} alt="" />
                                        <span className="pkgE-exc-text">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ══ BOTTOM CTA ══ */}
            <div className="pkgE-cta">
                <div className="pkgE-cta-pattern" />
                <h2>Ready to Explore {destination.name}?</h2>
                <p>Get in touch with our travel experts and we'll plan your perfect trip.</p>
                <div className="pkgE-cta-btns">
                    <a href="/#contact" className="pkgE-cta-primary">Enquire Now</a>

                    <button onClick={() => navigate(`/destination/${destSlug}`)} className="pkgE-cta-secondary">
                        ← All Packages
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
