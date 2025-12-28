import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Calendar } from 'lucide-react';

const FacultyDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem('token');

  // Load classes/subjects on mount
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/faculty/subjects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setAssignments(data.data || []);
      } catch (err) { console.error(err); }
      finally { setFetching(false); }
    };
    loadSubjects();
  }, [token]);

  // Fetch feedbacks when filters are ready
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      const getFeedbacks = async () => {
        setLoading(true);
        try {
          // Send subjectName as "Math" to match your DB courseName
          const res = await fetch(
            `http://localhost:5000/api/faculty/feedbacks?classId=${selectedClass}&subjectName=${selectedSubject}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await res.json();
          setFeedbacks(data.data || []);
        } catch (err) { setFeedbacks([]); }
        finally { setLoading(false); }
      };
      getFeedbacks();
    }
  }, [selectedClass, selectedSubject, token]);

  if (fetching) return <div style={styles.loader}>Loading...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Faculty Dashboard</h1>
        <p style={styles.headerSubtitle}>Student Feedback Overview</p>
      </header>

      <div style={styles.filterCard}>
        <div style={styles.filterGroup}>
          <div style={styles.selectWrapper}>
            <label style={styles.label}>Class</label>
            <select value={selectedClass} onChange={(e) => {setSelectedClass(e.target.value); setSelectedSubject('');}} style={styles.select}>
              <option value="">-- Choose Class --</option>
              {[...new Set(assignments.map(a => a.classId))].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={styles.selectWrapper}>
            <label style={styles.label}>Subject</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={styles.select} disabled={!selectedClass}>
              <option value="">-- Choose Subject --</option>
              {assignments.filter(a => a.classId === selectedClass).map(a => <option key={a._id} value={a.subjectName}>{a.subjectName}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading ? <div style={styles.loader}>Fetching Records...</div> : (
        feedbacks.length > 0 ? (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Student</th>
                  <th style={styles.th}>Rating</th>
                  <th style={styles.th}>Comment</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(fb => (
                  <tr key={fb._id} style={styles.tr}>
                    <td style={styles.td}>{fb.student?.name || 'Anonymous'}</td>
                    <td style={styles.td}><div style={styles.ratingBadge}>{fb.rating} <Star size={12} fill="#b45309" /></div></td>
                    <td style={styles.td}>{fb.comment}</td>
                    <td style={styles.td}>{new Date(fb.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}><MessageSquare size={48} color="#cbd5e1" /><p>No feedback found for {selectedSubject || 'this course'}</p></div>
        )
      )}
    </div>
  );
};

const styles = {
  container: { marginTop: '5%', padding: '40px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Inter", sans-serif' },
  header: { textAlign: 'center', marginBottom: '40px' },
  headerTitle: { color: '#2E3A59', fontSize: '2.2rem', fontWeight: '800' },
  headerSubtitle: { color: '#64748b' },
  filterCard: { backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '900px', border: '1px solid #e2e8f0' },
  filterGroup: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  selectWrapper: { flex: 1, minWidth: '200px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#64748b' },
  select: { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #f1f5f9', cursor: 'pointer' },
  tableWrapper: { backgroundColor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '1100px', border: '1px solid #e2e8f0', marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#2E3A59', color: '#FFFFFF' },
  th: { padding: '18px', textAlign: 'left', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '18px', color: '#475569' },
  ratingBadge: { backgroundColor: '#fff9eb', color: '#b45309', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '5px' },
  emptyState: { textAlign: 'center', padding: '60px', color: '#94a3b8' },
  loader: { padding: '40px', color: '#2E3A59', fontWeight: '600' }
};

export default FacultyDashboard;