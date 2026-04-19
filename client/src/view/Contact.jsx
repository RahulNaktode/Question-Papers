import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './../components/Navbar.jsx'
import Input from './../components/Input.jsx'
import Button from './../components/Button.jsx'
import toast, { Toaster } from 'react-hot-toast'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "suggestion", // Default type
    subject: "",
    description: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.subject) {
      toast.error("Please fill in the required fields");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual endpoint (e.g., http://localhost:8030/support)
      const response = await axios.post('http://localhost:8030/support', formData);
      
      if (response.data.success) {
        toast.success(`${formData.type === 'suggestion' ? 'Suggestion' : 'Report'} sent successfully!`);
        setFormData({ name: "", email: "", type: "suggestion", subject: "", description: "" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row'>
          
          {/* Sidebar Info */}
          <div className='bg-blue-600 md:w-1/3 p-8 text-white'>
            <h2 className='text-2xl font-bold mb-4'>Help & Support</h2>
            <p className='text-blue-100 mb-6'>
              Whether you want to suggest a feature or report a technical problem, we are here to listen.
            </p>
            <div className='space-y-4 text-sm'>
              <p>📍 Campus Library, Block A</p>
              <p>📧 support@studentportal.com</p>
              <p>🕒 Response time: 24-48 hours</p>
            </div>
          </div>

          {/* Form Section */}
          <div className='md:w-2/3 p-8'>
            <form onSubmit={handleSubmit} className='space-y-5'>
              
              {/* Toggle Switch */}
              <div className='flex bg-gray-100 p-1 rounded-lg w-fit'>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'suggestion'})}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${formData.type === 'suggestion' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                >
                  💡 Suggestion
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'problem'})}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${formData.type === 'problem' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
                >
                  ⚠️ Report Problem
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                  type="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <Input 
                placeholder={formData.type === 'suggestion' ? "Subject (e.g., New Department Idea)" : "Problem (e.g., Image not loading)"}
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />

              <textarea 
                className='w-full p-3 border-2 border-gray-100 rounded-lg focus:border-blue-500 outline-none min-h-30 transition-all'
                placeholder={formData.type === 'suggestion' ? "Tell us your idea..." : "Describe the bug or issue..."}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />

              <Button 
                title={loading ? "Sending..." : "Submit"} 
                varient={formData.type === 'suggestion' ? 'primary' : 'danger'} 
                disabled={loading}
                className="w-full"
              />
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Contact