import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HelpSupport from './pages/HelpSupport';

// 1. Layout Wrapper to handle conditional Navbar/Footer correctly
const LayoutWrapper = ({ user, children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div style={styles.appContainer}>
      {/* Navbar shows if user is logged in and NOT on login page */}
      {user && !isLoginPage && <Navbar />}
      
      <main style={styles.content}>
        {children}
      </main>

      {/* Footer shows if user is logged in and NOT on login page */}
      {user && !isLoginPage && <Footer />}
    </div>
  );
};

// 2. Protected Route Component for security
const ProtectedRoute = ({ user, requiredRole, children }) => {
  if (!user) return <Navigate to="/" />;
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to their own dashboard if they try to access the wrong role
    return <Navigate to={`/${user.role}`} />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <LayoutWrapper user={user}>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={!user ? <Login /> : <Navigate to={`/${user.role}`} />} />

          {/* Protected Routes with Role Authorization */}
          <Route 
            path="/student" 
            element={<ProtectedRoute user={user} requiredRole="student"><StudentDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/faculty" 
            element={<ProtectedRoute user={user} requiredRole="faculty"><FacultyDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute user={user} requiredRole="admin"><AdminDashboard /></ProtectedRoute>} 
          />
          
          <Route 
            path="/help" 
            element={<ProtectedRoute user={user}><HelpSupport /></ProtectedRoute>} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};

export default App;