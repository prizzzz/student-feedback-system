import React, { useState } from 'react';
import { Search, MessageSquare, Mail, Phone, ExternalLink, ChevronRight } from 'lucide-react';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const categories = [
    { title: "Account Access", icon: <Search size={20} />, description: "Login issues and role permissions" },
    { title: "Feedback System", icon: <MessageSquare size={20} />, description: "How to submit and view evaluations" },
    { title: "Technical Support", icon: <ExternalLink size={20} />, description: "Bug reporting and system performance" }
  ];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Help & Support</h1>
          <p style={styles.subtitle}>How can we assist you today?</p>
          
          <div style={styles.searchContainer}>
            <Search style={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides..." 
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.mainGrid}>
          {/* Left Column: Categories */}
          <div style={styles.leftCol}>
            <h2 style={styles.sectionTitle}>Categories</h2>
            <div style={styles.categoryGrid}>
              {categories.map((cat, index) => (
                <div key={index} style={styles.categoryCard}>
                  <div style={styles.iconWrapper}>{cat.icon}</div>
                  <h3 style={styles.cardTitle}>{cat.title}</h3>
                  <p style={styles.cardText}>{cat.description}</p>
                  <div style={styles.cardLink}>
                    View Articles <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={styles.rightCol}>
            <div style={styles.contactCard}>
              <h2 style={styles.formTitle}>Contact Support</h2>
              {formSubmitted ? (
                <div style={styles.successMsg}>
                  Your message has been sent. We will respond within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Subject</label>
                    <input type="text" required style={styles.input} placeholder="e.g. Cannot access dashboard" />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea required style={styles.textarea} placeholder="Describe your issue in detail..."></textarea>
                  </div>
                  <button type="submit" style={styles.submitBtn}>Send Message</button>
                </form>
              )}
              
              <div style={styles.divider} />
              
              <div style={styles.directContact}>
                <div style={styles.contactItem}>
                  <Mail size={16} color="#F5A623" />
                  <span>support@fdbk-system.edu</span>
                </div>
                <div style={styles.contactItem}>
                  <Phone size={16} color="#F5A623" />
                  <span>+1 (555) 000-1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    paddingTop: '84px', // Space for fixed Navbar
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, sans-serif',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#2E3A59',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '18px',
    marginBottom: '30px',
  },
  searchContainer: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
  },
  searchInput: {
    width: '100%',
    padding: '16px 16px 16px 55px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    outline: 'none',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#2E3A59',
    marginBottom: '24px',
    fontWeight: '700',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  iconWrapper: {
    width: '45px',
    height: '45px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#F5A623',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2E3A59',
    marginBottom: '8px',
  },
  cardText: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
    marginBottom: '16px',
  },
  cardLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#F5A623',
  },
  contactCard: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#2E3A59',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#475569',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    minHeight: '120px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#F5A623',
    color: '#1C1C1C',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
  },
  successMsg: {
    padding: '20px',
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '600',
  },
  divider: {
    height: '1px',
    backgroundColor: '#f1f5f9',
    margin: '30px 0',
  },
  directContact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#64748b',
  }
};

export default HelpSupport;