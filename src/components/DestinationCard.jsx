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

const DESTINATION_FLAGS_SVG = {
    "Almaty": ["kz"],
    "Australia": ["au"],
    "Netherland": ["nl"],
    "Netherlands": ["nl"],
    "Bali": ["id"],
    "Dubai": ["ae"],
    "United Arab Emirates": ["ae"],
    "Greece": ["gr"],
    "Hong Kong": ["hk"],
    "Italy": ["it"],
    "Japan": ["jp"],
    "Malaysia": ["my"],
    "Mauritius": ["mu"],
    "Maldives": ["mv"],
    "Northern lights": ["fi", "no", "is"],
    "Northern Lights": ["fi", "no", "is"],
    "France": ["fr"],
    "Singapore": ["sg"],
    "South Africa": ["za"],
    "Spain": ["es"],
    "Switzerland": ["ch"],
    "Thailand": ["th"],
    "Turkey": ["tr"],
    "United Kingdom": ["gb"],
    "United States of America": ["us"],
    "Vietnam": ["vn"]
};

export default function DestinationCard({ destination, offset, isDragging }) {
    const navigate = useNavigate();
    const absOffset = Math.abs(offset);
    const isCenter = absOffset < 0.5;
    const limitOffset = Math.max(-2.5, Math.min(2.5, offset));
    
    // 3D Coverflow Physics calculations
    const rotateY = limitOffset * -40;       // Angle items to create perfect cylindrical curvature
    const translateX = offset * 220;         // Absolutely position items radially outwards!
    const translateZ = absOffset * -180;     // Push adjacent slides deeply into the z-plane
    const scale = Math.max(0.65, 1 - absOffset * 0.18); // Maintain slight 2D scale down naturally
    const blur = Math.min(absOffset * 1.5, 6); // Very gentle background blur focus
    const opacity = Math.max(0.4, 1 - absOffset * 0.25);
    const zIndex = Math.round(100 - absOffset * 10);

    const [hovered, setHovered] = React.useState(false);
    const cardImage = destinationImages[destination.name];

    return (
        <motion.div
            onClick={() => navigate(`/destination/${destination.slug}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ x: translateX, scale, opacity, filter: `blur(${blur}px)`, rotateY, z: translateZ }}
            transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 28 }}
            whileHover={isCenter ? { scale: 1.02, rotateY: 0 } : {}}
            style={{ 
                position: "absolute",
                left: "50%",
                marginLeft: "clamp(-170px, -13vw, -110px)",
                zIndex, 
                flexShrink: 0, 
                cursor: isDragging ? "grabbing" : "pointer", 
                willChange: "transform, opacity, filter, rotateY, z", 
                transformStyle: "preserve-3d" 
            }}
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
                    .dest-card-content h3 img {
                        width: 18px !important;
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

                {/* Content - Emulating the strong typographic block of the reference image */}
                <div
                    className="dest-card-content"
                    style={{
                        position: "absolute",
                        bottom: 36,
                        left: 32,
                        right: 32,
                        zIndex: 2,
                        transform: isCenter ? "translateZ(30px)" : "translateZ(0)", // Pops Text subtly outward!
                        transition: "transform 0.4s ease"
                    }}
                >
                    <h3
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "clamp(20px, 2.2vw, 28px)",
                            color: "#fff",
                            fontWeight: 800,
                            margin: "0 0 8px 0",
                            lineHeight: 1.1,
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "8px"
                        }}
                    >
                        {destination.name}
                        {DESTINATION_FLAGS_SVG[destination.name] && DESTINATION_FLAGS_SVG[destination.name].map((code, idx) => (
                            <img 
                                key={code}
                                src={`https://flagcdn.com/${code}.svg`} 
                                alt={`${destination.name} flag`} 
                                style={{ 
                                    width: DESTINATION_FLAGS_SVG[destination.name].length > 1 ? "18px" : "24px", 
                                    height: "auto", 
                                    borderRadius: "2px", 
                                    opacity: 0.95,
                                    marginLeft: idx === 0 ? "8px" : "4px",
                                    display: "block",
                                    boxSizing: "border-box",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                                }} 
                            />
                        ))}
                    </h3>
                    <div
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 12,
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 500,
                            letterSpacing: 0.5,
                            marginBottom: 16,
                            opacity: isCenter ? 1 : 0.8,
                        }}
                    >
                        {destination.tagline}
                    </div>
                    
                    <div
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 11,
                            color: "#fff",
                            fontWeight: 700,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            opacity: isCenter ? 1 : 0,
                            pointerEvents: isCenter ? "auto" : "none",
                            transition: "opacity 0.3s ease"
                        }}
                    >
                        Explore <span style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "none" }}>&rarr;</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
