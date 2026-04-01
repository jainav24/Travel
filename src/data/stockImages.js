// ─── STOCK PHOTO IMPORTS ─────────────────────────────────────────────────
// Central mapping of all stock photos organized by destination.
// Each destination has ONE unique image for card and general display as requested.

// ── ALMATY ──
import almatyImg from "../assets/Stock photos/Almaty/visit-almaty-wN4D-mVR7fE-unsplash.jpg";

// ── BALI ──
import baliImg from "../assets/Stock photos/bali.jpeg";

// ── DUBAI ──
import dubaiImg from "../assets/Stock photos/dubai.jpeg";

// ── NORTHERN LIGHTS ──
import northernLightsImg from "../assets/Stock photos/Northern Lights, Finland/jonatan-pie-EvKBHBGgaUo-unsplash.jpg";

// ── HONG KONG ──
import hongkongImg from "../assets/Stock photos/Hong Kong/pexels-apasaric-2484847.jpg";

// ── JAPAN ──
import japanImg from "../assets/Stock photos/Japan/pexels-satoshi-1325837.jpg";

// ── MAURITIUS ──
import mauritiusImg from "../assets/Stock photos/Mauritius/pexels-asadphoto-1591374.jpg";

// ── SINGAPORE ──
import singaporeImg from "../assets/Stock photos/Singapore/pexels-roamingfreev-9164196.jpg";

// ── GREECE ──
import greeceImg from "../assets/Stock photos/Greece/Santorini/pexels-jimmy-teoh-294331-1010650.jpg";

// ─── CLEAN MAPPING SYSTEM ────────────────────────────────────────────────────
// Mapping from destination name -> image variable as requested.

export const destinationImages = {
    "Almaty": almatyImg,
    "Bali": baliImg,
    "Dubai": dubaiImg,
    "Northern Lights": northernLightsImg,
    "Japan": japanImg,
    "Hong Kong": hongkongImg,
    "Mauritius": mauritiusImg,
    "Singapore": singaporeImg,
    "Greece": greeceImg,
    // Add destinations that don't have folders as needed
    "Malaysia": null, 
    "Italy": null,
    "Australia": null,
    "Netherlands": null
};

// ─── LEGACY EXPORT MAP (for components using old stockImages structure) ───────
// We keep this temporarily during transition

const stockImages = {
    almaty: { hero: almatyImg, card: almatyImg, gallery: [almatyImg] },
    bali: { hero: baliImg, card: baliImg, gallery: [baliImg] },
    dubai: { hero: dubaiImg, card: dubaiImg, gallery: [dubaiImg] },
    "northern-lights": { hero: northernLightsImg, card: northernLightsImg, gallery: [northernLightsImg] },
    hongkong: { hero: hongkongImg, card: hongkongImg, gallery: [] },
    "hong-kong": { hero: hongkongImg, card: hongkongImg, gallery: [] },
    japan: { hero: japanImg, card: japanImg, gallery: [japanImg] },
    mauritius: { hero: mauritiusImg, card: mauritiusImg, gallery: [mauritiusImg] },
    singapore: { hero: singaporeImg, card: singaporeImg, gallery: [singaporeImg] },
    greece: { hero: greeceImg, card: greeceImg, gallery: [greeceImg] },
    malaysia: { hero: null, card: null, gallery: [] },
};

export default stockImages;
