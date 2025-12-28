import React, { useState } from 'react';
import { Send, ArrowLeft, CheckCircle, User, BookOpen } from 'lucide-react';

const Feedback = ({ facultyId, facultyName, subjectName, classId, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facultyId,
          courseName: subjectName,
          classId, // send classId!
          rating: Number(rating),
          comment
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Could not submit feedback. Please try again.');
      }

      setStatus({ loading: false, success: true, error: '' });
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  if (status.success) {
    return (
      <div style={styles.formCard}>
        <div style={styles.successWrapper}>
          <CheckCircle size={60} color="#10b981" />
          <h2 style={{ color: '#1C1C1C' }}>Success!</h2>
          <p style={{ color: '#64748b' }}>Your feedback for {facultyName} has been recorded.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.formContainer}>
      <button onClick={onClose} style={styles.backBtn}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Course Feedback</h2>
        {status.error && <div style={styles.errorMsg}>{status.error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Faculty Member</label>
            <div style={styles.readOnlyContainer}>
               <User size={16} color="#64748b" style={{marginRight: '8px'}} />
               <input type="text" value={facultyName} readOnly style={styles.readOnlyInput} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject / Course</label>
            <div style={styles.readOnlyContainer}>
               <BookOpen size={16} color="#64748b" style={{marginRight: '8px'}} />
               <input type="text" value={subjectName} readOnly style={styles.readOnlyInput} />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Overall Rating</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} style={styles.select}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Comment</label>
            <textarea
              required
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Provide constructive feedback..."
              style={styles.textarea}
            />
          </div>

          <button 
            type="submit" 
            disabled={status.loading}
            style={{ ...styles.submitBtn, opacity: status.loading ? 0.7 : 1, cursor: status.loading ? 'not-allowed' : 'pointer' }}
          >
            {status.loading ? 'Processing...' : 'Submit Feedback'} <Send size={18} style={{ marginLeft: '10px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};


const styles = {
  formContainer: { maxWidth: '600px', margin: '0 auto' },
  backBtn: { background: 'none', border: 'none', color: '#2E3A59', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' },
  formCard: { backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
  formTitle: { color: '#2E3A59', marginBottom: '30px', fontSize: '1.5rem', fontWeight: '700' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', color: '#475569', fontWeight: '600', fontSize: '0.9rem' },
  readOnlyContainer: { display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '0 16px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  readOnlyInput: { width: '100%', padding: '12px 0', backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#1C1C1C', fontWeight: '600', fontSize: '1rem' },
  select: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' },
  textarea: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' },
  submitBtn: { width: '100%', padding: '14px', backgroundColor: '#F5A623', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  errorMsg: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', textAlign: 'center' },
  successWrapper: { textAlign: 'center', padding: '20px 0' }
};

export default Feedback;