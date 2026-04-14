import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'

function Aero() {
  const [uploadedPapers, setUploadedPapers] = useState([])
  const [formData, setFormData] = useState({
    subject: "",
    semester: "",
    year: "",
    paperUrl: []
  })

  const addQuestionPaper = async () => {
    const respones = await axios.post('http://localhost:8030/questions', formData)
    if (respones.data.success) {
      alert('Question paper uploaded successfully')
      setFormData({
        subject: "",
        semester: "",
        year: "",
        paperUrl: []
      })
    } else {
      alert('Failed to upload question paper')
    }
  }

  const getQuestionPapers = async () => {
    const respones = await axios.get('http://localhost:8030/questions')
    if (respones.data.success) {
      setUploadedPapers(respones.data.data)
    } else {
      alert('Failed to retrieve question papers')
    }

  }

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

        <div className='border p-6 rounded-lg shadow-md' style={{ backgroundColor: '#f9f9f9' }}>
          <Input
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />

          <Input
            type="text"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          />

          <Input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />


        </div>


      </div>
    </div>

  )
}

export default Aero
