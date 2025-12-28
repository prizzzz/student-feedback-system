import React, { useState, useEffect } from "react";
import { BookOpen, User, AlertCircle } from "lucide-react";
import Feedback from "./Feedback";

const StudentDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/student/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch subjects");

      const data = await res.json();
      setSubjects(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.center}>Loading subjects...</div>;

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.contentWrapper}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Student Dashboard</h1>
          <p style={styles.subtitle}>Manage your course feedback and insights</p>
        </header>

        {error && (
          <div style={styles.errorBanner}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {!selectedSubject ? (
          <div style={styles.flexGrid}>
            {subjects.length > 0 ? (
              subjects.map((sub) => (
                <div key={sub._id} style={styles.card}>
                  <div style={styles.iconWrapper}>
                    <BookOpen size={28} color="#F5A623" />
                  </div>
                  <h3 style={styles.subjectName}>{sub.subjectName}</h3>
                  <div style={styles.facultyRow}>
                    <User size={16} color="#64748b" />
                    <span style={styles.facultyName}>
                      {sub.faculty?.name || sub.facultyName || "Unknown"}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(sub)}
                    style={styles.btnPrimary}
                  >
                    Give Feedback
                  </button>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>No subjects assigned.</div>
            )}
          </div>
        ) : (
          <div style={styles.centeredFeedback}>
            <Feedback
              facultyId={
                selectedSubject.faculty?._id ||
                selectedSubject.facultyId ||
                selectedSubject.faculty
              }
              facultyName={
                selectedSubject.faculty?.name ||
                selectedSubject.facultyName ||
                "Unknown"
              }
              subjectName={selectedSubject.subjectName}
              classId={selectedSubject.classId}
              onClose={() => setSelectedSubject(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center",     // Centers vertically
    minHeight: "100vh",       // Takes full height of the screen
    width: "100%",
    backgroundColor: "#f8fafc",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: '"Inter", sans-serif',
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginBottom: "40px",
    textAlign: "center",
  },
  headerTitle: {
    color: "#2E3A59",
    fontSize: "2.2rem",
    fontWeight: "800",
    margin: 0,
  },
  subtitle: {
    color: "#64748b",
    marginTop: "8px",
    fontSize: "1.1rem",
  },
  flexGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Centers cards in the row
    gap: "24px",
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    textAlign: "center",
    width: "280px", // Fixed width to keep them uniform while centering
    transition: "transform 0.2s ease",
  },
  iconWrapper: {
    marginBottom: "15px",
    display: "inline-block",
  },
  subjectName: {
    color: "#1C1C1C",
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  facultyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  facultyName: {
    color: "#475569",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  btnPrimary: {
    backgroundColor: "#F5A623",
    color: "#FFFFFF",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    transition: "background 0.3s",
  },
  centeredFeedback: {
    width: "100%",
    maxWidth: "600px",
  },
  errorBanner: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "12px 24px",
    borderRadius: "8px",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  emptyState: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "40px",
    fontSize: "1.2rem",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    color: "#2E3A59",
    fontWeight: "600",
    fontSize: "1.2rem",
    backgroundColor: "#f8fafc",
  },
};

export default StudentDashboard;