import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    dark: "#1a1a2e",
    muted: "#64748b",
    bg: "#ffffff",
    tagBg: "#fef3e2",
    tagText: "#9a3412",
    yellowCta: "#facc15",
};

/** Short labels for listing cards — from package data only: amenities or inclusions (no highlights fallback). */
export function getListingAmenityLines(pkg) {
    if (Array.isArray(pkg.amenities) && pkg.amenities.length) {
        return pkg.amenities.slice(0, 6).map((s) => String(s).trim()).filter(Boolean);
    }
    if (Array.isArray(pkg.inclusions) && pkg.inclusions.length) {
        return pkg.inclusions.slice(0, 6).map((s) => String(s).trim()).filter(Boolean);
    }
    return [];
}

function formatDurationBadge(duration) {
    if (!duration) return "";
    const nMatch = String(duration).match(/(\d+)\s*N/i);
    const dMatch = String(duration).match(/(\d+)\s*D/i);
    if (dMatch && nMatch) return `${dMatch[1]}D|${nMatch[1]}N`;
    return String(duration).replace(/\s+/g, " ").trim();
}

function formatPriceRupee(priceStr) {
    const match = String(priceStr).replace(/,/g, "").match(/₹([\d]+)/);
    if (match) return `₹${parseInt(match[1], 10).toLocaleString("en-IN")}`;
    return null;
}

function ListingCard({ pkg, index, destinationSlug, listingImage }) {
    const navigate = useNavigate();

    const go = () => {
        if (pkg.hasDetailPage && pkg.slug) {
            navigate(`/destination/${pkg.destinationSlug || destinationSlug}/package/${pkg.slug}`);
        }
    };

    const amenities = getListingAmenityLines(pkg);
    const priceMain = formatPriceRupee(pkg.price);
    const priceStrike = pkg.originalPrice ? formatPriceRupee(pkg.originalPrice) : null;
    const imgSrc = listingImage || pkg.listingImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            onClick={go}
            style={{
                display: "flex",
                flexDirection: "row",
                background: COLORS.bg,
                borderRadius: 20,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                cursor: pkg.hasDetailPage ? "pointer" : "default",
                maxWidth: 960,
                margin: "0 auto",
                width: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
            className="package-listing-card"
        >
            <style>{`
                @media (max-width: 768px) {
                    .package-listing-card { 
                        flex-direction: column !important; 
                        border-radius: 20px !important; 
                        margin-bottom: 24px !important; 
                        width: 100% !important;
                    }
                    .listing-card-img-side { 
                        flex: none !important; 
                        height: 220px !important; 
                        width: 100% !important;
                    }
                    .listing-card-content-side { 
                        padding: 24px 20px !important; 
                        text-align: center !important; 
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important; 
                    }
                    .listing-card-content-side h3 {
                        text-align: center !important;
                    }
                    .listing-card-content-side > div {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    .listing-card-price-row { 
                        flex-direction: column !important; 
                        align-items: center !important; 
                        text-align: center !important;
                        gap: 16px !important; 
                        width: 100% !important; 
                        margin-top: 16px !important;
                    }
                    .listing-card-cta-btn { width: 100% !important; max-width: 280px !important; }
                    .listing-card-highlights { justify-content: center !important; }
                }
            `}</style>
            {/* Image ~40% */}
            <div
                className="listing-card-img-side"
                style={{
                    flex: "1 1 260px",
                    minHeight: 200,
                    maxWidth: "100%",
                    position: "relative",
                }}
            >
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: 220,
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            minHeight: 220,
                            background: `linear-gradient(135deg, ${COLORS.primary}33, ${COLORS.primaryLight}44)`,
                        }}
                    />
                )}
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(0,0,0,0.45)",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: 6,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                    }}
                >
                    {formatDurationBadge(pkg.duration)}
                </div>
            </div>

            {/* Content ~60% */}
            <div
                className="listing-card-content-side"
                style={{
                    flex: "1 1 300px",
                    padding: "22px 24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    minWidth: 0,
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(17px, 2vw, 20px)",
                        fontWeight: 700,
                        color: COLORS.primary,
                        lineHeight: 1.35,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {pkg.title}
                </h3>

                {amenities.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: "8px 16px",
                        }}
                    >
                        {amenities.map((line, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 8,
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 12,
                                    color: "#334155",
                                    lineHeight: 1.4,
                                }}
                            >
                                <span
                                    style={{
                                        color: "#16a34a",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                        marginTop: 1,
                                    }}
                                    aria-hidden
                                >
                                    ✓
                                </span>
                                <span style={{ minWidth: 0 }}>{line}</span>
                            </div>
                        ))}
                    </div>
                )}

                {pkg.destinationsCovered && pkg.destinationsCovered.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {pkg.destinationsCovered.map((d) => (
                            <span
                                key={d}
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    background: COLORS.tagBg,
                                    color: COLORS.tagText,
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 11,
                                    fontWeight: 600,
                                }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                )}

                <div
                    className="listing-card-price-row"
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                        marginTop: "auto",
                        paddingTop: 8,
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 11,
                                color: COLORS.muted,
                                marginBottom: 4,
                            }}
                        >
                            per person, starting from*
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                            {priceMain && (
                                <span
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: 22,
                                        fontWeight: 800,
                                        color: COLORS.dark,
                                    }}
                                >
                                    {priceMain}
                                </span>
                            )}
                            {priceStrike && (
                                <span
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: 14,
                                        color: COLORS.muted,
                                        textDecoration: "line-through",
                                    }}
                                >
                                    {priceStrike}
                                </span>
                            )}
                            {!priceMain && (
                                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark }}>
                                    {pkg.price}
                                </span>
                            )}
                        </div>
                    </div>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            go();
                        }}
                        className="listing-card-cta-btn"
                        style={{
                            padding: "14px 44px",
                            borderRadius: 999,
                            border: "none",
                            background: COLORS.yellowCta,
                            color: "#0f172a",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 13,
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: "0 8px 25px rgba(250,204,21,0.4)",
                        }}
                    >
                        Get Offer
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

function HorizontalSplitCard({ pkg, index, destinationSlug, listingImage }) {
    const navigate = useNavigate();

    const go = () => {
        if (pkg.hasDetailPage && pkg.slug) {
            navigate(`/destination/${pkg.destinationSlug || destinationSlug}/package/${pkg.slug}`);
        }
    };

    const highlights = pkg.highlights || getListingAmenityLines(pkg);
    const priceMain = formatPriceRupee(pkg.price);
    const imgSrc = listingImage || pkg.listingImage;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={go}
            style={{
                display: "flex",
                flexDirection: "row",
                background: COLORS.bg,
                borderRadius: 20,
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                overflow: "hidden",
                cursor: pkg.hasDetailPage ? "pointer" : "default",
                width: "100%",
                transition: "all 0.3s ease",
            }}
            whileHover={{
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                borderColor: COLORS.primaryLight + "33",
            }}
        >
            <style>{`
                @media (max-width: 768px) {
                    .horizontal-split-wrapper { 
                        flex-direction: column !important; 
                        width: 100% !important;
                    }
                    .h-split-left { 
                        width: 100% !important; 
                        height: 220px !important; 
                        flex: none !important; 
                    }
                    .h-split-right { 
                        width: 100% !important; 
                        padding: 24px 20px !important; 
                        text-align: center !important; 
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important; 
                    }
                    .h-split-right h3 {
                        text-align: center !important;
                    }
                    .h-split-price-section { 
                        flex-direction: column !important; 
                        align-items: center !important; 
                        text-align: center !important;
                        gap: 16px !important; 
                        width: 100% !important; 
                    }
                    .h-split-cta-btn { width: 100% !important; max-width: 280px !important; }
                }
            `}</style>

            <div className="horizontal-split-wrapper" style={{ display: "flex", width: "100%" }}>
                {/* Left Side (40%) */}
                <div
                    className="h-split-left"
                    style={{
                        flex: "0 0 40%",
                        position: "relative",
                        overflow: "hidden",
                        background: "#f1f5f9",
                    }}
                >
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt={pkg.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.6s ease",
                            }}
                        />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primaryLight}33)` }} />
                    )}

                    {/* Duration Badge */}
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            background: COLORS.primary,
                            color: "#fff",
                            padding: "6px 14px",
                            borderRadius: 50,
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 1,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            zIndex: 10,
                        }}
                    >
                        {pkg.duration}
                    </div>
                </div>

                {/* Right Side (60%) */}
                <div
                    className="h-split-right"
                    style={{
                        flex: "1",
                        padding: "24px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minWidth: 0,
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "clamp(18px, 2.2vw, 21px)",
                                fontWeight: 800,
                                color: COLORS.dark,
                                lineHeight: 1.3,
                                margin: "0 0 12px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {pkg.title}
                        </h3>

                        {/* Highlights (4-6 bullet points) */}
                        {highlights.length > 0 && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    gap: "8px 16px",
                                    marginBottom: 16,
                                }}
                            >
                                {highlights.slice(0, 6).map((h, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 10,
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 13,
                                            color: COLORS.muted,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        <span style={{ color: "#10b981", fontWeight: 900, flexShrink: 0 }}>✓</span>
                                        <span style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{h}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tags (Chips) */}
                        {pkg.destinationsCovered && pkg.destinationsCovered.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {pkg.destinationsCovered.map((d) => (
                                    <span
                                        key={d}
                                        style={{
                                            padding: "5px 14px",
                                            borderRadius: 50,
                                            background: "#f1f5f9",
                                            color: COLORS.muted,
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            letterSpacing: 0.5,
                                            border: "1px solid #e2e8f0",
                                        }}
                                    >
                                        {d}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div
                        className="h-split-price-section"
                        style={{
                            marginTop: "auto",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            paddingTop: 16,
                            borderTop: "1px solid #f1f5f9",
                            gap: 20,
                            flexWrap: "wrap",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'Montserrat', sans-serif", marginBottom: 2 }}>per person, starting from*</span>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                                <span style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif" }}>
                                    {priceMain || (pkg.price && pkg.price.match(/₹[\d,]+/)?.[0]) || pkg.price}
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="h-split-cta-btn"
                            style={{
                                padding: "14px 44px",
                                borderRadius: 50,
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                                color: "#fff",
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: 1,
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 10px 30px rgba(30,58,138,0.25)",
                            }}
                        >
                            {pkg.hasDetailPage ? "View Details" : "Get Offer"}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function PackageCard({ pkg, index, destinationSlug, variant = "grid", listingImage }) {
    if (variant === "listing" || variant === "horizontal-split") {
        return (
            <div style={{ width: "100%", marginBottom: "32px", maxWidth: 1000, margin: "0 auto 32px" }}>
                <HorizontalSplitCard pkg={pkg} index={index} destinationSlug={destinationSlug} listingImage={listingImage} />
            </div>
        );
    }

    const navigate = useNavigate();
    const handleClick = () => {
        if (pkg.hasDetailPage && pkg.slug) {
            navigate(`/destination/${pkg.destinationSlug || destinationSlug}/package/${pkg.slug}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="package-grid-card group relative"
            style={{
                background: COLORS.bg,
                borderRadius: 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)",
                cursor: pkg.hasDetailPage ? "pointer" : "default",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "330px",
                minWidth: "330px",
                flex: "0 0 330px",
                scrollSnapAlign: "start",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
            }}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(30,58,138,0.12)",
                border: "1px solid rgba(30,58,138,0.2)",
            }}
            onClick={handleClick}
        >
            <style>{`
                @media (max-width: 768px) {
                    .package-grid-card { 
                        width: 100% !important; 
                        min-width: 0 !important; 
                        flex: 1 1 100% !important; 
                        margin-bottom: 20px !important;
                        text-align: center !important;
                    }
                    .package-grid-card h3 {
                        text-align: center !important;
                    }
                    .package-grid-card ul {
                        align-items: center !important;
                    }
                    .package-grid-card div[style*="marginTop: 'auto'"] {
                        flex-direction: column !important;
                        gap: 16px !important;
                        align-items: center !important;
                    }
                    .package-grid-card button {
                        width: 100% !important;
                        max-width: 200px !important;
                    }
                }
            `}</style>
            {/* Image Header */}
            <div style={{ height: 200, width: "100%", position: "relative", overflow: "hidden" }}>
                {(listingImage || pkg.listingImage) ? (
                    <img
                        src={listingImage || pkg.listingImage}
                        alt={pkg.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primaryLight}33)` }} />
                )}

                {/* Duration Badge */}
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: COLORS.primary,
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: 50,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                >
                    {pkg.duration}
                </div>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <h3
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: COLORS.dark,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        margin: 0,
                        lineHeight: 1.4,
                        minHeight: "2.8em",
                    }}
                >
                    {pkg.title}
                </h3>

                {/* Highlights (2-3 only) */}
                {pkg.highlights && pkg.highlights.length > 0 && (
                    <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                            <li
                                key={i}
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 12,
                                    color: COLORS.muted,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6
                                }}
                            >
                                <span style={{ color: COLORS.secondary, fontSize: 14 }}>•</span>
                                <span style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{h}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Key Tags (Chips) */}
                {pkg.destinationsCovered && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                        {pkg.destinationsCovered.slice(0, 2).map((d) => (
                            <span
                                key={d}
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: 50,
                                    background: "#f8fafc",
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: COLORS.muted,
                                    letterSpacing: 0.5,
                                    border: "1px solid #f1f5f9",
                                }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 10, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>From</span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif" }}>
                            {formatPriceRupee(pkg.price) || (pkg.price && pkg.price.match(/₹[\d,]+/)?.[0]) || "Call for Price"}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                        style={{
                            padding: "8px 18px",
                            borderRadius: 50,
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                            color: "#fff",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 1,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(30,58,138,0.2)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Check in
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
