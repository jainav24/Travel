// ─── STOCK PHOTO IMPORTS ─────────────────────────────────────────────────
// Central mapping of all stock photos organized by destination.
// Each destination has: hero (large banner), card (thumbnail/card), and gallery images.

// ── ALMATY ──
import almatyHero from "../assets/Stock photos/Almaty/two-tourist-standing-road-near-snowy-mountain.jpg";
import almatyCard from "../assets/Stock photos/Almaty/visit-almaty-wN4D-mVR7fE-unsplash.jpg";
import almatyGallery1 from "../assets/Stock photos/Almaty/beautiful-mountain-village-covered-snow-alps-austria.jpg";
import almatyGallery2 from "../assets/Stock photos/Almaty/cable-way-with-cable-cars-mountain-area-france.jpg";
import almatyGallery3 from "../assets/Stock photos/Almaty/friends-skiers-having-fun-ski-resort-mountains-winter-skiing-snowboarding.jpg";

// ── BALI ──
import baliHero from "../assets/Stock photos/Bali/young-woman-standing-temple-gates-lempuyang-luhur-temple-bali-indonesia-vintage-tone.jpg";
import baliCard from "../assets/Stock photos/Bali/bali-pagoda-indonesia.jpg";
import baliGallery1 from "../assets/Stock photos/Bali/pura-taman-ayun-temple-bali-indonesia.jpg";
import baliGallery2 from "../assets/Stock photos/Bali/pexels-timrael-2474687.jpg";
import baliGallery3 from "../assets/Stock photos/Bali/tourist-holding-man-s-hand-leading-him-besakih-temple-bali-indonesia.jpg";

// ── DUBAI ──
import dubaiHero from "../assets/Stock photos/Dubai/pexels-miguel-cuenca-67882473-36329344.jpg";
import dubaiCard from "../assets/Stock photos/Dubai/david-rodrigo-Fr6zexbmjmc-unsplash.jpg";
import dubaiGallery1 from "../assets/Stock photos/Dubai/alla-rome-nA4i_aN1V7w-unsplash.jpg";
import dubaiGallery2 from "../assets/Stock photos/Dubai/timo-volz-Of8qUpuUkjQ-unsplash.jpg";
import dubaiGallery3 from "../assets/Stock photos/Dubai/darcey-beau-KTivTunp_lw-unsplash.jpg";

// ── NORTHERN LIGHTS (covering Finland, Iceland, Tromso) ──
import northernLightsHero from "../assets/Stock photos/Northern Lights, Finland/vincent-guth-62V7ntlKgL8-unsplash.jpg";
import northernLightsCard from "../assets/Stock photos/Northern Lights, Finland/jonatan-pie-EvKBHBGgaUo-unsplash.jpg";
import northernLightsGallery1 from "../assets/Stock photos/Northern Lights, Finland/tapio-haaja-z9LKMs0P3bo-unsplash.jpg";
import northernLightsGallery2 from "../assets/Stock photos/Northern Lights, Iceland/pexels-pixabay-356831.jpg";
import northernLightsGallery3 from "../assets/Stock photos/Northern Lights, Tromso/Tromso/sven-pieren-EOIBHzK7zBA-unsplash.jpg";

// ── HONG KONG (first entry - slug "hongkong") ──
import hongkongHero from "../assets/Stock photos/Hong Kong/florian-wehde-DpgujuZ92zE-unsplash.jpg";
import hongkongCard from "../assets/Stock photos/Hong Kong/pexels-apasaric-2484847.jpg";

// ── HONG KONG (second entry - slug "hong-kong") ──
import hongKongHero from "../assets/Stock photos/Hong Kong/yufeng-fei-UXwbhoONX3U-unsplash.jpg";
import hongKongCard from "../assets/Stock photos/Hong Kong/cecelia-chang-o9__Gu6jFOY-unsplash.jpg";

// ── JAPAN ──
import japanHero from "../assets/Stock photos/Japan/pexels-satoshi-1979828.jpg";
import japanCard from "../assets/Stock photos/Japan/pexels-satoshi-1325837.jpg";
import japanGallery1 from "../assets/Stock photos/Japan/pexels-ameliacui-4331673.jpg";
import japanGallery2 from "../assets/Stock photos/Japan/pexels-taryn-elliott-4198572.jpg";
import japanGallery3 from "../assets/Stock photos/Japan/pexels-nguy-n-khanh-790383-1710001.jpg";

// ── MALAYSIA ──
// Malaysia folder is empty — no stock photos provided, keep existing unsplash URL
// We'll leave these as-is

// ── MAURITIUS ──
import mauritiusHero from "../assets/Stock photos/Mauritius/pexels-alex-1858121-3525724.jpg";
import mauritiusCard from "../assets/Stock photos/Mauritius/pexels-asadphoto-1591374.jpg";
import mauritiusGallery1 from "../assets/Stock photos/Mauritius/pexels-francesco-ungaro-33603930.jpg";
import mauritiusGallery2 from "../assets/Stock photos/Mauritius/pexels-yaaseen-kahaar-3473532-5214008.jpg";

// ── SINGAPORE ──
import singaporeHero from "../assets/Stock photos/Singapore/pexels-steve-chai-3445927-5158875.jpg";
import singaporeCard from "../assets/Stock photos/Singapore/pexels-roamingfreev-9164196.jpg";
import singaporeGallery1 from "../assets/Stock photos/Singapore/pexels-farah-sayyed-2154383226-33285835.jpg";
import singaporeGallery2 from "../assets/Stock photos/Singapore/pexels-wang-qihang-673548932-30572489.jpg";

// ── GREECE ──
import greeceHero from "../assets/Stock photos/Greece/Santorini/pexels-jimmy-teoh-294331-1010640.jpg";
import greeceCard from "../assets/Stock photos/Greece/Santorini/pexels-jimmy-teoh-294331-1010650.jpg";
import greeceGallery1 from "../assets/Stock photos/Greece/Athens/pexels-mantasink-16857497.jpg";
import greeceGallery2 from "../assets/Stock photos/Greece/Mykonos/pexels-axp-photography-500641970-16563681.jpg";
import greeceGallery3 from "../assets/Stock photos/Greece/Santorini/pexels-myersmc16-1029007.jpg";

// ─── EXPORT MAP ──────────────────────────────────────────────────────────────

const stockImages = {
    almaty: {
        hero: almatyHero,
        card: almatyCard,
        gallery: [almatyGallery1, almatyGallery2, almatyGallery3],
    },
    bali: {
        hero: baliHero,
        card: baliCard,
        gallery: [baliGallery1, baliGallery2, baliGallery3],
    },
    dubai: {
        hero: dubaiHero,
        card: dubaiCard,
        gallery: [dubaiGallery1, dubaiGallery2, dubaiGallery3],
    },
    "northern-lights": {
        hero: northernLightsHero,
        card: northernLightsCard,
        gallery: [northernLightsGallery1, northernLightsGallery2, northernLightsGallery3],
    },
    hongkong: {
        hero: hongkongHero,
        card: hongkongCard,
        gallery: [],
    },
    "hong-kong": {
        hero: hongKongHero,
        card: hongKongCard,
        gallery: [],
    },
    japan: {
        hero: japanHero,
        card: japanCard,
        gallery: [japanGallery1, japanGallery2, japanGallery3],
    },
    mauritius: {
        hero: mauritiusHero,
        card: mauritiusCard,
        gallery: [mauritiusGallery1, mauritiusGallery2],
    },
    singapore: {
        hero: singaporeHero,
        card: singaporeCard,
        gallery: [singaporeGallery1, singaporeGallery2],
    },
    greece: {
        hero: greeceHero,
        card: greeceCard,
        gallery: [greeceGallery1, greeceGallery2, greeceGallery3],
    },
    // Malaysia has an empty stock photos folder — keeping existing images
    malaysia: {
        hero: null,
        card: null,
        gallery: [],
    },
};

export default stockImages;
