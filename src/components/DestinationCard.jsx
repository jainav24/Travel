import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { destinationImages } from "../data/stockImages";

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

    const [hovered, setHovered] = React.useState(false);
    const cardImage = destinationImages[destination.name];

    return (
        <motion.div
            onClick={() => navigate(`/destination/${destination.slug}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ scale, opacity, filter: `blur(${blur}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={isCenter ? { scale: 1.03 } : {}}
            style={{ zIndex, flexShrink: 0, cursor: "pointer", willChange: "transform, opacity, filter" }}
            className="destination-card-wrapper"
        >
            <style>{`
                .destination-card-wrapper { width: clamp(220px, 26vw, 340px); }
                @media (max-width: 768px) {
                    .destination-card-wrapper { width: clamp(240px, 75vw, 300px) !important; }
                    .dest-card-content { 
                        text-align: center !important; 
                        left: 16px !important; 
                        right: 16px !important; 
                        bottom: 40px !important; 
                        display: flex !important; 
                        flex-direction: column !important; 
                        align-items: center !important; 
                    }
                    .destination-card-shell { border-radius: 20px !important; }
                }
            `}</style>
            {/* Card shell */}
            <div
                className="destination-card-shell"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: 24,
                    overflow: "hidden",
                    aspectRatio: "3/4.2",
                    boxShadow: isCenter ? "0 20px 40px rgba(0,0,0,0.25)" : "0 10px 20px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.4s ease",
                }}
            >
                {/* Background Image */}
                <img
                    src={cardImage}
                    alt={destination.name}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: hovered ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                />

                {/* Overlays */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: isCenter
                        ? "linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    transition: "opacity 0.4s",
                }} />

                {/* Content */}
                <div
                    className="dest-card-content"
                    style={{
                        position: "absolute",
                        bottom: 32,
                        left: 28,
                        right: 28,
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 10,
                            color: COLORS.secondary,
                            fontWeight: 700,
                            letterSpacing: 2.5,
                            textTransform: "uppercase",
                            marginBottom: 8,
                            opacity: isCenter ? 1 : 0.8,
                        }}
                    >
                        {destination.country}
                    </div>
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(24px, 2.8vw, 36px)",
                            color: "#fff",
                            fontWeight: 700,
                            margin: "0 0 12px 0",
                            lineHeight: 1.1,
                        }}
                    >
                        {destination.name}
                    </h3>
                    <div
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 11,
                            color: "#fff",
                            fontWeight: 600,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        Explore <span style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "none" }}>&rarr;</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
