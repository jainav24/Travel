import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const COLORS = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  dark: "#1a1a2e",
  muted: "#64748b",
  bg: "#ffffff",
  bgAlt: "#f1f5f9",
  bgAlt2: "#e2e8f0",
};

const NAV_HEIGHT = 72;

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(20px, 2.5vw, 26px)",
      color: COLORS.primary,
      fontWeight: 700,
      marginBottom: 14,
      paddingBottom: 10,
      borderBottom: `2px solid ${COLORS.bgAlt2}`,
    }}>
      {title}
    </h2>
    {children}
  </div>
);

const Para = ({ children }) => (
  <p style={{
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 1.85,
    marginBottom: 12,
  }}>
    {children}
  </p>
);

const BulletList = ({ items }) => (
  <ul style={{ paddingLeft: 22, marginBottom: 12 }}>
    {items.map((item, i) => (
      <li key={i} style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 15,
        color: COLORS.muted,
        lineHeight: 1.85,
        marginBottom: 6,
      }}>
        {item}
      </li>
    ))}
  </ul>
);

export default function TermsAndConditionsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", paddingTop: NAV_HEIGHT }}>
      {/* Page Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #2563eb 100%)`,
        padding: "60px 5vw 50px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,0.6)",
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          textTransform: "uppercase", marginBottom: 10,
        }}>
          Legal
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          color: "#fff", fontWeight: 700, lineHeight: 1.1,
        }}>
          Terms & Conditions
        </h1>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 14, color: "rgba(255,255,255,0.65)",
          marginTop: 12,
        }}>
          Last updated: March 2025
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 5vw 80px" }}>

        <Para>
          These Terms and Conditions ("Terms") govern your use of the We Plan Trips website and all travel services provided by us. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.
        </Para>

        <Section title="1. Services">
          <Para>
            We Plan Trips provides customised travel planning services including itinerary design, accommodation booking, activity recommendations, and travel consultation. All packages are curated based on client preferences and are subject to availability.
          </Para>
        </Section>

        <Section title="2. Bookings & Payments">
          <Para>
            All bookings are confirmed only upon receipt of a deposit or full payment as specified in your travel quote. Prices are quoted in Indian Rupees (INR) and are subject to change until a booking is confirmed.
          </Para>
          <BulletList items={[
            "A non-refundable booking deposit is required to secure your package.",
            "Full payment is typically due 30 days prior to departure.",
            "Prices quoted are per person unless stated otherwise.",
            "We reserve the right to adjust pricing due to changes in taxes, fees, or supplier costs.",
          ]} />
        </Section>

        <Section title="3. Cancellation & Refund Policy">
          <Para>Cancellation charges apply as follows from the date of confirmed booking:</Para>
          <BulletList items={[
            "90+ days before departure: 10% of total package cost",
            "60–89 days before departure: 25% of total package cost",
            "30–59 days before departure: 50% of total package cost",
            "15–29 days before departure: 75% of total package cost",
            "Less than 15 days before departure: 100% of total package cost (no refund)",
          ]} />
          <Para>
            Refunds, where applicable, will be processed within 14–21 business days to the original payment method.
          </Para>
        </Section>

        <Section title="4. Changes to Bookings">
          <Para>
            Requests to amend a confirmed booking (change of dates, destinations, or itinerary) are subject to availability and may incur additional charges. We will make every effort to accommodate changes but cannot guarantee amendments after confirmation.
          </Para>
        </Section>

        <Section title="5. Travel Documents & Insurance">
          <Para>
            It is the sole responsibility of the traveller to ensure they hold valid passports, visas, and any other required travel documents. We Plan Trips is not liable for any costs arising from improper documentation.
          </Para>
          <Para>
            We strongly recommend that all travellers obtain comprehensive travel insurance covering trip cancellation, medical emergencies, and personal liability prior to departure.
          </Para>
        </Section>

        <Section title="6. Our Liability">
          <Para>
            We Plan Trips acts as an intermediary between travellers and third-party suppliers (hotels, airlines, transport providers, etc.). We shall not be held liable for any loss, injury, damage, delay, or additional expenses arising from:
          </Para>
          <BulletList items={[
            "Acts of God, natural disasters, or force majeure events",
            "Actions or negligence of third-party service providers",
            "Government actions, strikes, or political unrest",
            "Personal illness, injury, or accidents during travel",
          ]} />
        </Section>

        <Section title="7. Health & Safety">
          <Para>
            Travellers are responsible for ensuring they are in adequate physical health to undertake their chosen activities. We reserve the right to deny or modify bookings where a traveller's health or safety may be at risk.
          </Para>
        </Section>

        <Section title="8. Intellectual Property">
          <Para>
            All content on the We Plan Trips website, including text, images, graphics, and logos, is the property of We Plan Trips and is protected by applicable copyright and intellectual property laws. Reproduction without written consent is strictly prohibited.
          </Para>
        </Section>

        <Section title="9. Privacy">
          <Para>
            Your use of our services is also governed by our{" "}
            <Link to="/privacy-policy" style={{ color: COLORS.primary, fontWeight: 600 }}>
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference.
          </Para>
        </Section>

        <Section title="10. Governing Law">
          <Para>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of India.
          </Para>
        </Section>

        <Section title="11. Changes to Terms">
          <Para>
            We reserve the right to modify these Terms at any time. The updated Terms will be posted on this page with a revised effective date. Continued use of our services following any changes constitutes acceptance of the new Terms.
          </Para>
        </Section>

        <Section title="12. Contact Us">
          <Para>
            For questions about these Terms and Conditions, please reach out to us:
          </Para>
          <Para>
            <strong style={{ color: COLORS.dark }}>We Plan Trips</strong><br />
            Email: support@weplantripss.com<br />
            Phone: +91 98765 43210<br />
            India
          </Para>
        </Section>

        <div style={{ paddingTop: 20, borderTop: `1px solid ${COLORS.bgAlt2}` }}>
          <Link to="/" style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13, color: COLORS.primary,
            fontWeight: 600, textDecoration: "none",
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
