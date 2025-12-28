import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, TypeOutline, User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      // Sending email, password, and role to the backend for cross-validation
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store both token and user details
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token || "");

        setMessage(`Welcome back, ${data.user?.name || "User"}`);

        // Redirect based on the role stored in the database
        setTimeout(() => {
          window.location.href = `/${data.user.role}`;
        }, 1000);
      } else {
        setIsError(true);
        // Display specific error if the role doesn't match the email
        setMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Connection failed. Please ensure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.loginContainer}>
        
        {/* Unified Branding - Matched to Footer/Navbar */}
        <div style={styles.header}>
          <div style={styles.brandContainer}>
            <div style={styles.brandLine}></div>
            <div style={styles.brandContent}>
              <div style={styles.logoArea}>
                <span style={styles.logoIcon}>🎓</span>
                <span style={styles.logoText}>
                  STUDENT<span style={styles.logoThin}>FEEDBACK</span>
                </span>
              </div>
              <div style={styles.brandSubtitle}>SECURE ACCESS PORTAL</div>
            </div>
            <div style={styles.brandLine}></div>
          </div>
        </div>

        {/* Login Form Card */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Sign In</h2>

          {message && (
            <div style={{
                ...styles.message,
                backgroundColor: isError ? "#fef2f2" : "#f0fdf4",
                color: isError ? "#dc2626" : "#16a34a",
                border: isError ? "1px solid #fecaca" : "1px solid #bbf7d0",
              }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email Field */}
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>
                <Mail size={16} style={styles.inputIcon} />
                <label style={styles.label}>Email Address</label>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>
                <Lock size={16} style={styles.inputIcon} />
                <label style={styles.label}>Password</label>
              </div>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.passwordInput}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div style={styles.inputGroup}>
              <div style={styles.inputLabel}>
                <User size={16} style={styles.inputIcon} />
                <label style={styles.label}>Login As</label>
              </div>
              <div style={styles.roleButtons}>
                {["student", "faculty", "admin"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    disabled={isLoading}
                    style={{
                      ...styles.roleButton,
                      ...(role === option ? styles.roleButtonActive : {}),
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f1f5f9" },
  loginContainer: { width: "100%", maxWidth: "420px", padding: "20px" },
  header: { marginBottom: "32px" },
  brandContainer: { display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" },
  brandLine: { flex: 1, height: "2px", backgroundColor: "#cbd5e1" },
  brandContent: { display: "flex", flexDirection: "column", alignItems: "center" },
  logoArea: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: { fontSize: "1.6rem" },
  logoText: { fontSize: "1.3rem", fontWeight: "900", color: "#1e293b", letterSpacing: "1px" },
  logoThin: { fontWeight: "300", color: "#64748b" },
  brandSubtitle: { fontSize: "10px", fontWeight: "700", color: "#94a3b8", letterSpacing: "2px", marginTop: "4px" },
  formCard: { backgroundColor: "#ffffff", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)", border: "1px solid #e2e8f0" },
  formTitle: { fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "24px", textAlign: "center" },
  message: { padding: "12px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px", textAlign: "center", fontWeight: "600" },
  form: { width: "100%" },
  inputGroup: { marginBottom: "20px" },
  inputLabel: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" },
  label: { fontSize: "14px", fontWeight: "700", color: "#475569" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "15px", boxSizing: "border-box", outline:"1px solid #2E3A59" },
  passwordContainer: { position: "relative", display: "flex" },
  passwordInput: { width: "100%", padding: "12px 45px 12px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "15px", boxSizing: "border-box", outline:"1px solid #2E3A59" },
  eyeButton: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8" },
  roleButtons: { display: "flex", gap: "10px" },
  roleButton: { flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #2E3A59", backgroundColor: "#f8fafc", fontWeight: "700", color: "#64748b", cursor: "pointer", transition: "0.2s" },
  roleButtonActive: { backgroundColor: "#2E3A59", color: "#fff" },
  submitButton: { width: "100%", padding: "14px", backgroundColor: "#F5A623", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer", marginTop: "10px" }
};

export default Login;