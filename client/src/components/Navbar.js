import React, { useState } from "react";
import { LayoutDashboard, HelpCircle, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Don't show navbar on login page if not logged in
  if (window.location.pathname === "/" && !user) return null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    return `/${user.role.toLowerCase()}`;
  };

  return (
    <nav style={styles.navBar}>
      <div style={styles.container}>
        
        {/* LEFT SIDE: Brand - MATCHED TO FOOTER */}
        <div style={styles.leftSection}>
          <a href="/" style={styles.logoLink}>
             <div style={styles.logoArea}>
              <span style={styles.logoIcon}>🎓</span>
              <span style={styles.logoText}>
                STUDENT<span style={styles.logoThin}>FEEDBACK</span>
              </span>
            </div>
          </a>
        </div>

        {/* RIGHT SIDE: Dashboard + Profile */}
        <div style={styles.rightSection}>
          <a 
            href={getDashboardPath()} 
            style={{
              ...styles.dashboardTab,
              ...(isNavHovered ? { color: "#F5A623" } : {}),
              ...(window.location.pathname.includes(user?.role?.toLowerCase()) ? styles.activeTab : {})
            }}
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
          >
            <LayoutDashboard size={18} style={{ marginRight: '8px' }} />
            Dashboard
          </a>

          <div 
            style={styles.profileSection}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div
              style={{
                ...styles.userTrigger,
                ...(isProfileHovered || isDropdownOpen ? styles.userTriggerHover : {})
              }}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div style={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span style={styles.userName}>{user?.name || "User"}</span>
              <ChevronDown size={14} style={styles.arrow} />
            </div>

            {isDropdownOpen && (
              <>
                <div style={styles.dropdownBridge} />
                <div style={styles.dropdown}>
                  <div style={styles.dropdownContent}>
                    <a 
                      href="/help" 
                      style={{
                        ...styles.dropLink,
                        ...(isHelpHovered ? styles.dropLinkHover : {})
                      }}
                      onMouseEnter={() => setIsHelpHovered(true)}
                      onMouseLeave={() => setIsHelpHovered(false)}
                    >
                      <HelpCircle size={16} style={styles.dropIcon} /> 
                      Help Support
                    </a>
                    
                    <div style={styles.divider} />

                    <button 
                      onClick={handleLogout} 
                      style={{
                        ...styles.logoutBtn,
                        ...(isLogoutHovered ? styles.logoutBtnHover : {})
                      }}
                      onMouseEnter={() => setIsLogoutHovered(true)}
                      onMouseLeave={() => setIsLogoutHovered(false)}
                    >
                      <LogOut size={16} style={{ 
                        color: isLogoutHovered ? "#FFFFFF" : "#dc2626" 
                      }} /> 
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: "#2E3A59",
    height: "70px", // Slightly increased to fit the footer-style logo nicely
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    zIndex: 1000,
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logoLink: {
    textDecoration: "none",
  },
  /* BRANDING CSS MATCHED TO FOOTER */
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "1.6rem",
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
  /* END BRANDING CSS */
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  dashboardTab: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
  activeTab: {
    color: "#F5A623",
    fontWeight: "600",
  },
  profileSection: {
    position: "relative",
    padding: "15px 0",
  },
  userTrigger: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  },
  userTriggerHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  avatar: {
    width: "32px",
    height: "32px",
    backgroundColor: "#F5A623",
    color: "#1C1C1C",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "13px",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "500",
  },
  arrow: {
    color: "#FFFFFF",
    opacity: 0.8,
  },
  dropdownBridge: {
    position: "absolute",
    top: "100%",
    right: 0,
    width: "100%",
    height: "10px",
    background: "transparent",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 5px)",
    right: "0",
    width: "190px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    zIndex: 1001,
    border: "1px solid #E2E8F0",
    overflow: "hidden",
  },
  dropdownContent: {
    padding: "0",
  },
  dropLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "#2E3A59",
    fontSize: "14px",
    padding: "14px 16px",
    transition: "all 0.2s ease",
  },
  dropLinkHover: {
    backgroundColor: "#F1F5F9",
  },
  dropIcon: {
    color: "#64748B",
  },
  divider: {
    height: "1px",
    backgroundColor: "#F1F5F9",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#dc2626",
    border: "none",
    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
  },
  logoutBtnHover: {
    backgroundColor: "#dc2626",
    color: "#FFFFFF",
  },
};

export default Navbar;