import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'

function Aero() {
  const [uploadedPapers, setUploadedPapers] = useState([])
  const [formData, setFormData] = useState({
    studentName: '',
    semester: '',
    subject: '',
    file: null,
    photo: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.studentName && formData.semester && formData.subject && formData.file && formData.photo) {
      const newPaper = {
        id: Date.now(),
        studentName: formData.studentName,
        semester: formData.semester,
        subject: formData.subject,
        photoUrl: URL.createObjectURL(formData.photo),
        fileName: formData.file.name
      }
      setUploadedPapers([...uploadedPapers, newPaper])
      setFormData({ studentName: '', semester: '', subject: '', file: null, photo: null })
      alert('Paper uploaded successfully!')
    }
  }

  const semesters = [
    { sem: 1, title: 'Semester 1', papers: ['Engineering Mechanics', 'Thermodynamics', 'Mathematics'] },
    { sem: 2, title: 'Semester 2', papers: ['Fluid Mechanics', 'Aerodynamics', 'Materials Science'] },
    { sem: 3, title: 'Semester 3', papers: ['Flight Dynamics', 'Aircraft Design', 'Propulsion'] },
    { sem: 4, title: 'Semester 4', papers: ['Control Systems', 'Avionics', 'Aerospace Structures'] }
  ]

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>✈️ Aeronautical Engineering</h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px' }}>
          Complete semester-wise question papers and study materials for Aero
        </p>

       {uploadedPapers.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2>🎓 Student Uploaded Papers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {uploadedPapers.map((paper) => (
                <div key={paper.id} style={{ border: '2px solid #4CAF50', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <img src={paper.photoUrl} alt={paper.subject} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '15px' }}>
                    <p className='mx-8 '><strong>Name:</strong> {paper.studentName}</p>
                    <p style={{ margin: '8px 0', color: '#666' }}><strong>Semester:</strong> {paper.semester}</p>
                    <p style={{ margin: '8px 0', color: '#666' }}><strong>Subject:</strong> {paper.subject}</p>
                    <p style={{ margin: '8px 0', color: '#666' }}><strong>File:</strong> {paper.fileName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div style={{ background: '#e3f2fd', padding: '30px', borderRadius: '10px', marginBottom: '40px' }}>
          <h2>📤 Upload Question Papers & Photos</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
            <select 
              name="semester" 
              value={formData.semester}
              onChange={handleInputChange}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              required
            >
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
            <Input 
              type="text" 
              name="subject" 
              placeholder="Subject Name (e.g., Data Structures)" 
              value={formData.subject}
              onChange={handleInputChange}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '14px' }}
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>📸 Upload Photo</label>
                <input 
                  type="file" 
                  name="photo" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                  required
                />
              </div>
            </div>
            <button type="submit" style={{ padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              ✅ Submit Paper
            </button>
          </form>
        </div>
        
        </div>
      </div>
    
  )
}

export default Aero
