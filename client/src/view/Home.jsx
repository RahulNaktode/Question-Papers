import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', background: '#4CAF50', color: 'white', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
        ✅ All Semester Questions Are Available Now!
      </div>
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Welcome to Semester Questions</h1>
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
          Access department-wise semester question papers and study materials
        </p>
        
        <h2>Select a Department</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <Link to="/departements/aero" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Aeronautical Engineering</h3>
          </Link>
          <Link to="/departements/civil" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Civil Engineering</h3>
          </Link>
          <Link to="/departements/cse" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Computer Science</h3>
          </Link>
          <Link to="/departements/ds" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Data Science</h3>
          </Link>
          <Link to="/departements/electrical" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Electrical Engineering</h3>
          </Link>
          <Link to="/departements/it" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Information Technology</h3>
          </Link>
          <Link to="/departements/mechanical" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textDecoration: 'none', color: '#333', background: '#f9f9f9' }}>
            <h3>Mechanical Engineering</h3>
          </Link>
        </div>

        <div style={{ marginTop: '50px', padding: '30px', background: '#f0f4f8', borderRadius: '8px' }}>
          <h2>Why Choose Us?</h2>
          <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
            <li>📚 Comprehensive collection of previous semester question papers</li>
            <li>🎯 Organized by department for easy navigation</li>
            <li>⏰ Updated regularly with latest exam papers</li>
            <li>✨ Free access to study materials</li>
          </ul>
        </div>

        <div style={{ marginTop: '30px', padding: '30px', background: '#fff3cd', borderRadius: '8px' }}>
          <h2>How to Use</h2>
          <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
            <li>Select your department from the list above</li>
            <li>Browse through available semester papers</li>
            <li>Download and review the questions</li>
            <li>Practice and prepare for your exams</li>
          </ol>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', background: '#e8f5e9', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            📧 For any queries or to contribute question papers, contact us at <strong>support@semesterquestions.com</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home