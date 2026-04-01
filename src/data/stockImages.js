// ─── STOCK PHOTO IMPORTS ─────────────────────────────────────────────────
// Strict 1-to-1 mapping as requested.

// Exact file imports
import usaImg from "../assets/Stock photos/United States of America.jpg";
import ukImg from "../assets/Stock photos/United Kingdom.jpg";
import turkeyImg from "../assets/Stock photos/Turkey.jpg";
import thailandImg from "../assets/Stock photos/Thailand.jpg";
import switzerlandImg from "../assets/Stock photos/Switerland.jpg";
import spainImg from "../assets/Stock photos/Spain.jpg";
import southAfricaImg from "../assets/Stock photos/South Africa.jpg";
import franceImg from "../assets/Stock photos/France.jpg";
import maldivesImg from "../assets/Stock photos/Maldives.jpg";
import malaysiaImg from "../assets/Stock photos/Malaysia.jpg";
import italyImg from "../assets/Stock photos/Italy.jpg";
import netherlandsImg from "../assets/Stock photos/Netherland.jpg";
import australiaImg from "../assets/Stock photos/Australia.png";
import vietnamImg from "../assets/Stock photos/Vietnam.jpg";
import baliImg from "../assets/Stock photos/bali.jpeg";
import dubaiImg from "../assets/Stock photos/dubai.jpeg";

// Subfolder images
import hongkongImg from "../assets/Stock photos/Hong Kong/pexels-apasaric-2484847.jpg";
import greeceImg from "../assets/Stock photos/Greece/Santorini/pexels-jimmy-teoh-294331-1010650.jpg";
import japanImg from "../assets/Stock photos/Japan/pexels-satoshi-1325837.jpg";
import almatyImg from "../assets/Stock photos/Almaty/visit-almaty-wN4D-mVR7fE-unsplash.jpg";
import northernLightsImg from "../assets/Stock photos/Northern Lights, Finland/jonatan-pie-EvKBHBGgaUo-unsplash.jpg";
import mauritiusImg from "../assets/Stock photos/Mauritius/pexels-asadphoto-1591374.jpg";
import singaporeImg from "../assets/Stock photos/Singapore/pexels-roamingfreev-9164196.jpg";

// ─── STRICT IMAGE MAPPING OBJECT ─────────────────────────────────────────────
// Mapping as requested: name -> image variable.

export const destinationImages = {
    "United States of America": usaImg,
    "United Kingdom": ukImg,
    "Turkey": turkeyImg,
    "Thailand": thailandImg,
    "Switzerland": switzerlandImg,
    "Spain": spainImg,
    "South Africa": southAfricaImg,
    "France": franceImg,
    "Maldives": maldivesImg,
    "Malaysia": malaysiaImg,
    "Italy": italyImg,
    "Netherlands": netherlandsImg,
    "Australia": australiaImg,
    "Bali": baliImg,
    "Dubai": dubaiImg,
    "Vietnam": vietnamImg,
    "Hong Kong": hongkongImg,
    "Greece": greeceImg,
    "Japan": japanImg,
    "Almaty": almatyImg,
    "Northern Lights": northernLightsImg,
    "Mauritius": mauritiusImg,
    "Singapore": singaporeImg
};

// ─── LEGACY EXPORT MAP ───────────────────────────────────────────────────────
// Maintaining this for basic compatibility

const stockImages = {
    almaty: { hero: almatyImg, card: almatyImg },
    bali: { hero: baliImg, card: baliImg },
    dubai: { hero: dubaiImg, card: dubaiImg },
    japan: { hero: japanImg, card: japanImg },
    greece: { hero: greeceImg, card: greeceImg },
    hongkong: { hero: hongkongImg, card: hongkongImg },
};

export default stockImages;
