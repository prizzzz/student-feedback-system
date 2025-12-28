import React from 'react';

/**
 * High-Impact Professional Footer
 * Refined for consistency and layout stability.
 */
const Footer = () => {
  // Function to handle hover color change manually for inline styles
  const handleMouseEnter = (e) => {
    e.target.style.color = "#6366f1";
    e.target.style.transform = "translateX(5px)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = "#94a3b8";
    e.target.style.transform = "translateX(0px)";
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Top Section: Branding and Navigation */}
        <div style={styles.topSection}>
          
          {/* Brand Info - Kept Exactly as Requested */}
          <div style={styles.brandSide}>
            <div style={styles.logoArea}>
              <span style={styles.logoIcon}>🎓</span>
              <span style={styles.logoText}>STUDENT<span style={styles.logoThin}>FEEDBACK</span></span>
            </div>
            <p style={styles.tagline}>
              Empowering academic growth through transparent and meaningful feedback loops.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.linksGroup}>
            <div style={styles.linkColumn}>
              <h4 style={styles.columnTitle}>Platform</h4>
              <a href="/about" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About Us</a>
              <a href="/privacy" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Privacy Policy</a>
              <a href="/terms" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Terms of Service</a>
            </div>
            <div style={styles.linkColumn}>
              <h4 style={styles.columnTitle}>Support</h4>
              <a href="/help" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Help Center</a>
              <a href="/contact" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact Support</a>
              <a href="/faq" style={styles.footerLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>FAQs</a>
            </div>
          </div>
        </div>

        <div style={styles.divider}></div>

        {/* Bottom Section: Copyright and Status */}
        <div style={styles.bottomSection}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Student Feedback System. All rights reserved.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.statusDot}></span> System Online
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- STYLES ---
const styles = {
  footer: {
    backgroundColor: "#1e293b", 
    color: "#cbd5e1",
    padding: "60px 0 30px 0",
    marginTop: "auto", 
    width: "100vw",
    borderTop: "4px solid #6366f1", 
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "40px",
  },
  brandSide: {
    maxWidth: "350px",
    flex: "1 1 300px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  logoIcon: {
    fontSize: "1.8rem",
  },
  logoText: {
    fontSize: "1.2rem",
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: "1px",
  },
  logoThin: {
    fontWeight: "300",
    color: "#94a3b8",
  },
  tagline: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "#94a3b8",
    margin: 0,
  },
  linksGroup: {
    display: "flex",
    gap: "60px",
    flexWrap: "wrap",
  },
  linkColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "150px",
  },
  columnTitle: {
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "700",
    marginBottom: "10px",
    marginTop: 0,
  },
  footerLink: {
    textDecoration: "none",
    color: "#94a3b8",
    fontSize: "0.9rem",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    display: "inline-block", // Required for transform/translateX to work
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: "30px",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  copyright: {
    fontSize: "0.85rem",
    color: "#64748b",
    margin: 0,
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.8rem",
    color: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "600",
    border: "1px solid rgba(16, 185, 129, 0.2)",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    boxShadow: "0 0 8px #10b981",
    animation: "pulse 2s infinite", // Hint: You can add this keyframe in your global CSS
  }
};

export default Footer;