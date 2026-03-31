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
                flexWrap: "wrap",
                background: COLORS.bg,
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                cursor: pkg.hasDetailPage ? "pointer" : "default",
                maxWidth: 960,
                margin: "0 auto",
                width: "100%",
            }}
        >
            {/* Image ~40% */}
            <div
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
                        style={{
                            padding: "12px 28px",
                            borderRadius: 999,
                            border: "none",
                            background: COLORS.yellowCta,
                            color: "#0f172a",
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 13,
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(250,204,21,0.45)",
                        }}
                    >
                        Get Offer
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default function PackageCard({ pkg, index, destinationSlug, variant = "grid", listingImage }) {
    if (variant === "listing") {
        return (
            <ListingCard pkg={pkg} index={index} destinationSlug={destinationSlug} listingImage={listingImage} />
        );
    }
    
    if (variant === "horizontal") {
        const handleClick = () => {
            if (pkg.hasDetailPage && pkg.slug) {
                navigate(`/destination/${pkg.destinationSlug || destinationSlug}/package/${pkg.slug}`);
            }
        };

        return (
            <>
                <style>{`
                    .pkg-horizontal-card {
                        display: flex;
                        flex-direction: row;
                        border-radius: 16px;
                        overflow: hidden;
                        background: #fff;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                        transition: all 0.3s ease;
                        cursor: ${pkg.hasDetailPage ? "pointer" : "default"};
                        height: 100%;
                        min-height: 220px;
                    }
                    .pkg-horizontal-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.12);
                    }
                    .pkg-h-image {
                        width: 40%;
                        height: auto;
                        min-height: 220px;
                        position: relative;
                    }
                    .pkg-h-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.5s ease;
                    }
                    .pkg-horizontal-card:hover .pkg-h-image img {
                        transform: scale(1.08);
                    }
                    .pkg-h-content {
                        width: 60%;
                        padding: 24px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .pkg-h-button {
                        align-self: flex-end;
                    }
                    @media(max-width: 768px) {
                        .pkg-horizontal-card {
                            flex-direction: column;
                        }
                        .pkg-h-image {
                            width: 100%;
                            height: 200px;
                            min-height: 200px;
                        }
                        .pkg-h-content {
                            width: 100%;
                        }
                    }
                `}</style>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.45 }}
                    className="pkg-horizontal-card group"
                    onClick={handleClick}
                >
                    <div className="pkg-h-image overflow-hidden">
                        {(listingImage || pkg.listingImage) ? (
                            <img src={listingImage || pkg.listingImage} alt={pkg.title} />
                        ) : (
                            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primaryLight}33)` }} />
                        )}
                        <div
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                background: "rgba(0,0,0,0.5)",
                                color: "#fff",
                                padding: "4px 10px",
                                borderRadius: 6,
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 10,
                                fontWeight: 700,
                                backdropFilter: "blur(4px)",
                                zIndex: 10,
                            }}
                        >
                            {pkg.duration}
                        </div>
                    </div>
                    
                    <div className="pkg-h-content">
                        <div>
                            <h3
                                className="text-xl font-semibold leading-snug mb-3"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: COLORS.dark,
                                    margin: 0,
                                    marginBottom: "12px",
                                }}
                            >
                                {pkg.title}
                            </h3>
                            
                            {pkg.destinationsCovered && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "16px" }}>
                                    {pkg.destinationsCovered.map((d) => (
                                        <span
                                            key={d}
                                            style={{
                                                padding: "4px 12px",
                                                borderRadius: 50,
                                                background: COLORS.primary + "10",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: 10,
                                                fontWeight: 600,
                                                color: COLORS.primary,
                                                letterSpacing: 1,
                                            }}
                                        >
                                            {d}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: "16px" }}>
                                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: COLORS.muted }}>
                                    Starting from
                                </span>
                                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.dark }}>
                                    {formatPriceRupee(pkg.price) || pkg.price}
                                </span>
                            </div>
                        </div>

                        <div className="pkg-h-button">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                                    color: "#fff",
                                    fontFamily: "'Montserrat', sans-serif",
                                    boxShadow: "0 4px 18px rgba(30,58,138,0.3)",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick();
                                }}
                            >
                                {pkg.hasDetailPage ? "View Details" : "Get Offer"}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </>
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
            className="group relative overflow-hidden"
            style={{
                background: COLORS.bg,
                borderRadius: 20,
                boxShadow: "8px 8px 20px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.04)",
                cursor: pkg.hasDetailPage ? "pointer" : "default",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            whileHover={{
                boxShadow: "10px 10px 28px rgba(30,58,138,0.12), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
                border: "1px solid rgba(30,58,138,0.15)",
                y: -4,
            }}
            onClick={handleClick}
        >
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
                        className="group-hover:scale-110"
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primaryLight}33)` }} />
                )}
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {pkg.duration}
                </div>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1">
                <h3
                    className="text-lg font-semibold leading-snug"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px,1.6vw,20px)",
                        color: COLORS.dark,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        margin: 0,
                    }}
                >
                    {pkg.title}
                </h3>

                {pkg.destinationsCovered && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {pkg.destinationsCovered.map((d) => (
                            <span
                                key={d}
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: 50,
                                    background: COLORS.primary + "10",
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: COLORS.primary,
                                    letterSpacing: 1,
                                }}
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                )}

                <div style={{ height: 1, background: `linear-gradient(to right, rgba(30,58,138,0.15), transparent)` }} />

                <div className="flex items-center justify-end mt-auto">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                            color: "#fff",
                            fontFamily: "'Montserrat', sans-serif",
                            boxShadow: "0 4px 18px rgba(30,58,138,0.3)",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                    >
                        {pkg.hasDetailPage ? "View Details" : "Enquire"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
