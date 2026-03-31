import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    dark: "#1a1a2e",
    muted: "#64748b",
};

export default function DestinationCard({ destination, offset }) {
    const navigate = useNavigate();
    const absOffset = Math.abs(offset);
    const isCenter = absOffset < 0.5;

    const scale = Math.max(0.78, 1 - absOffset * 0.1);
    const blur = Math.min(absOffset * 4, 10);
    const opacity = Math.max(0.35, 1 - absOffset * 0.3);
    const zIndex = Math.round(100 - absOffset * 10);

    return (
        <motion.div
            onClick={() => navigate(`/destination/${destination.slug}`)}
            animate={{ scale, opacity, filter: `blur(${blur}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={isCenter ? { scale: 1.03 } : {}}
            style={{ zIndex, flexShrink: 0, cursor: "pointer", willChange: "transform, opacity, filter" }}
            className="w-[clamp(220px,26vw,340px)]"
        >
            {/* Card shell */}
            <div
                className="relative overflow-hidden"
                style={{
                    aspectRatio: "3 / 4",
                    borderRadius: 24,
                    boxShadow: isCenter
                        ? "10px 10px 30px rgba(0,0,0,0.12), -4px -4px 16px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,255,255,0.4)"
                        : "6px 6px 20px rgba(0,0,0,0.08), -2px -2px 10px rgba(255,255,255,0.5)",
                    border: isCenter ? `2px solid ${COLORS.secondary}` : "1px solid rgba(0,0,0,0.06)",
                }}
            >
                {/* Image */}
                <img
                    src={destination.cardImg}
                    alt={destination.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Tag badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: COLORS.secondary }}>
                    {destination.tag}
                </div>

                {/* Text info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[10px] tracking-[3px] uppercase mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                        {destination.country}
                    </div>
                    <div className="text-2xl font-bold text-white leading-tight mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {destination.name}
                    </div>
                    <AnimatePresence>
                        {isCenter && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2 text-xs font-semibold tracking-wide"
                                style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.secondary }}
                            >
                                <span>Explore →</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
