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

export default function PrivacyPolicyPage() {
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
          Privacy Policy
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
          Welcome to We Plan Trips. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our travel planning services. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.
        </Para>

        <Section title="1. Information We Collect">
          <Para>We may collect information about you in a variety of ways including:</Para>
          <BulletList items={[
            "Personal Data: Name, email address, phone number, and travel preferences provided voluntarily when you contact us or make an enquiry.",
            "Usage Data: Information our servers automatically collect when you visit our website, such as your IP address, browser type, and pages visited.",
            "Cookies: Small data files stored on your device to improve browsing experience and remember preferences.",
          ]} />
        </Section>

        <Section title="2. How We Use Your Information">
          <Para>We use the information we collect in the following ways:</Para>
          <BulletList items={[
            "To respond to your enquiries and provide travel planning services.",
            "To send you updates, newsletters, and promotional materials (with your consent).",
            "To improve our website functionality and user experience.",
            "To comply with legal obligations and resolve disputes.",
          ]} />
        </Section>

        <Section title="3. Sharing Your Information">
          <Para>
            We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist in operating our website or providing travel services, subject to strict confidentiality agreements. We may also disclose information if required by law or to protect the rights, property, or safety of We Plan Trips or others.
          </Para>
        </Section>

        <Section title="4. Cookies">
          <Para>
            Our website uses cookies to enhance your experience. You can choose to disable cookies through your browser settings, although this may affect certain functionality of the website. By continuing to use our website, you consent to our use of cookies.
          </Para>
        </Section>

        <Section title="5. Data Security">
          <Para>
            We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </Para>
        </Section>

        <Section title="6. Third-Party Links">
          <Para>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
          </Para>
        </Section>

        <Section title="7. Children's Privacy">
          <Para>
            Our services are not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children. If we discover that a child under 13 has provided us with personal data, we will immediately delete that information.
          </Para>
        </Section>

        <Section title="8. Your Rights">
          <Para>Depending on your location, you may have the following rights regarding your personal data:</Para>
          <BulletList items={[
            "The right to access the personal data we hold about you.",
            "The right to request correction of inaccurate data.",
            "The right to request deletion of your personal data.",
            "The right to withdraw consent at any time.",
          ]} />
          <Para>
            To exercise any of these rights, please contact us at the details below.
          </Para>
        </Section>

        <Section title="9. Changes to This Policy">
          <Para>
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of our website after any changes constitutes your acceptance of the new policy.
          </Para>
        </Section>

        <Section title="10. Contact Us">
          <Para>
            If you have questions or concerns about this Privacy Policy, please contact us:
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
