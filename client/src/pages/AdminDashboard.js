import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, BookOpen, MessageSquare, PlusCircle, 
  Filter, Loader2, Trash2, Search, TrendingUp, Shield, GraduationCap
} from 'lucide-react';

const AdminDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [stats, setStats] = useState({ students: 0, faculty: 0, subjects: 0, feedbacks: 0 });
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [assignment, setAssignment] = useState({ classId: '', subjectName: '', facultyEmail: '' });
  const [formStatus, setFormStatus] = useState({ type: '', msg: '' });
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');

  // --- DATA FETCHING ---
  const fetchDashboardData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const [statsRes, usersRes, analyticsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/stats', { headers }),
        fetch('http://localhost:5000/api/admin/users', { headers }),
        fetch('http://localhost:5000/api/admin/analytics', { headers })
      ]);

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const analyticsData = await analyticsRes.json();

      setStats(statsData.data || { students: 0, faculty: 0, subjects: 0, feedbacks: 0 });
      setUsers(usersData.data || []);
      setAnalytics(analyticsData.data || []);
    } catch (err) {
      setError("Failed to fetch data from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDashboardData();
  }, [token]);

  // --- ACTIONS ---
  const handleAssignSubject = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'info', msg: 'Processing assignment...' });
    try {
      const res = await fetch('http://localhost:5000/api/admin/assign-subject', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(assignment)
      });
      const result = await res.json();
      if (res.ok) {
        setFormStatus({ type: 'success', msg: 'Subject assigned successfully!' });
        setAssignment({ classId: '', subjectName: '', facultyEmail: '' });
        fetchDashboardData(); 
      } else {
        setFormStatus({ type: 'error', msg: result.message || 'Assignment failed' });
      }
    } catch (err) {
      setFormStatus({ type: 'error', msg: 'Server error' });
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Permanently remove this user?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) fetchDashboardData();
      } catch (err) {
        alert("Deletion failed");
      }
    }
  };

  // --- FILTERING ---
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) return (
    <div style={styles.center}>
      <Loader2 className="animate-spin" size={48} color="#6366f1" />
      <p>Synchronizing Records...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Administrator Portal</h1>
        <p style={styles.headerSubtitle}>System-wide management and performance tracking</p>
      </header>

      {/* 1. STATS SECTION */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}><Users size={28} color="#6366f1" /><div><p style={styles.statLabel}>Students</p><h2 style={styles.statValue}>{stats.students}</h2></div></div>
        <div style={styles.statCard}><UserCheck size={28} color="#10b981" /><div><p style={styles.statLabel}>Faculty</p><h2 style={styles.statValue}>{stats.faculty}</h2></div></div>
        <div style={styles.statCard}><BookOpen size={28} color="#f59e0b" /><div><p style={styles.statLabel}>Subjects</p><h2 style={styles.statValue}>{stats.subjects}</h2></div></div>
        <div style={styles.statCard}><MessageSquare size={28} color="#ef4444" /><div><p style={styles.statLabel}>Feedbacks</p><h2 style={styles.statValue}>{stats.feedbacks}</h2></div></div>
      </div>

      <div style={styles.mainLayout}>
        <div style={styles.sidePanel}>
          {/* 2. SUBJECT ASSIGNMENT CARD */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><PlusCircle size={18} /> Assign Subject</h3>
            <form onSubmit={handleAssignSubject}>
              {formStatus.msg && (
                <div style={{ ...styles.alert, backgroundColor: formStatus.type === 'error' ? '#fee2e2' : '#dcfce7', color: formStatus.type === 'error' ? '#991b1b' : '#166534' }}>
                  {formStatus.msg}
                </div>
              )}
              <input 
                style={styles.input} 
                placeholder="Class (e.g. CS-2025)" 
                value={assignment.classId}
                onChange={(e) => setAssignment({...assignment, classId: e.target.value})}
                required 
              />
              <input 
                style={styles.input} 
                placeholder="Subject Name" 
                value={assignment.subjectName}
                onChange={(e) => setAssignment({...assignment, subjectName: e.target.value})}
                required 
              />
              <select 
                style={styles.input}
                value={assignment.facultyEmail}
                onChange={(e) => setAssignment({...assignment, facultyEmail: e.target.value})}
                required
              >
                <option value="">-- Select Faculty --</option>
                {users.filter(u => u.role === 'faculty').map(f => (
                  <option key={f._id} value={f.email}>{f.name}</option>
                ))}
              </select>
              <button type="submit" style={styles.btnPrimary}>Assign Subject</button>
            </form>
          </div>

          {/* 3. PERFORMANCE MINI-TABLE */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}><TrendingUp size={18} /> Faculty Performance</h3>
            <div style={styles.miniTableContainer}>
              {analytics.map(a => (
                <div key={a._id} style={styles.analyticsRow}>
                  <span>{a.name}</span>
                  <span style={styles.ratingBadge}>{a.avgRating} ★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. MAIN USER TABLE */}
        <div style={styles.mainContent}>
          <div style={styles.tableControls}>
            <div style={styles.searchBox}>
              <Search size={18} color="#94a3b8" />
              <input 
                style={styles.searchInput} 
                placeholder="Search by name or email..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select style={styles.filterSelect} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>User Details</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Class ID</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.userInfo}>
                        <div style={styles.userAvatar}>{user.name.charAt(0)}</div>
                        <div>
                          <div style={styles.userName}>{user.name}</div>
                          <div style={styles.userEmail}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.roleBadge, 
                        backgroundColor: user.role === 'faculty' ? '#e0f2fe' : '#dcfce7',
                        color: user.role === 'faculty' ? '#0369a1' : '#166534',
                        border: `1px solid ${user.role === 'faculty' ? '#0369a1' : '#166534'}`
                      }}>
                        {user.role === 'faculty' ? <Shield size={12} /> : <GraduationCap size={12} />}
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.td}><code style={styles.code}>{user.classId || 'Global'}</code></td>
                    <td style={styles.td}>
                      <button onClick={() => handleDeleteUser(user._id)} style={styles.btnDelete}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: { marginTop: '7%', padding: '0 40px 40px 40px', backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif' },
  header: { marginBottom: '40px', textAlign: 'left' },
  headerTitle: { fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', margin: 0 },
  headerSubtitle: { color: '#64748b', fontSize: '1rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' },
  statCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1' },
  statLabel: { color: '#64748b', fontSize: '0.875rem', fontWeight: '600', margin: 0 },
  statValue: { fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 },
  mainLayout: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px' },
  sidePanel: { display: 'flex', flexDirection: 'column', gap: '24px' },
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1' },
  cardTitle: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' },
  tableControls: { display: 'flex', gap: '16px', marginBottom: '20px' },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fff', padding: '0 16px', borderRadius: '12px', border: '1px solid #94a3b8' },
  searchInput: { border: 'none', outline: 'none', width: '100%', padding: '12px 0', fontSize: '0.95rem' },
  filterSelect: { padding: '0 16px', borderRadius: '12px', border: '1x solid #94a3b8', backgroundColor: '#fff', fontWeight: '600' },
  tableWrapper: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #94a3b8', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  tableHeader: { backgroundColor: '#f8fafc', borderBottom: '1px solid #94a3b8' },
  th: { padding: '16px 24px', fontSize: '0.75rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' },
  tr: { borderBottom: '1px solid #cbd5e1', transition: 'background 0.2s' },
  td: { padding: '16px 24px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  userAvatar: { width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#6366f1' },
  userName: { fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' },
  userEmail: { color: '#64748b', fontSize: '0.85rem' },
  roleBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' },
  code: { fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85rem' },
  btnDelete: { backgroundColor: '#fff1f2', color: '#e11d48', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' },
  miniTableContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  analyticsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #cbd5e1' },
  ratingBadge: { backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.85rem' },
  input: { width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' },
  btnPrimary: { width: '100%', padding: '12px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '16px' },
  alert: { padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.85rem', textAlign: 'center', fontWeight: '600' }
};

export default AdminDashboard;