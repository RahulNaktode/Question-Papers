import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
import Button from '../components/Button'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='bg-green-600 text-white p-3 text-center font-bold text-2xl mt-2'>
        ✅ All Semester Questions Are Available Now!
      </div>
      <div className='max-w-7xl mx-auto p-5'>
        <h1>Welcome to Semester Questions</h1>
        <p className='text-gray-500 my-3 '>
          Access department-wise semester question papers and study materials
        </p>
        
        <h2>Select a Department</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 '>
          <Link to="/aero" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Aeronautical Engineering</h3>
          </Link>
          <Link to="/civil" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Civil Engineering</h3>
          </Link>
          <Link to="/cse" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Computer Science</h3>
          </Link>
          <Link to="/ds" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Data Science</h3>
          </Link>
          <Link to="/electrical" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Electrical Engineering</h3>
          </Link>
          <Link to="/it" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Information Technology</h3>
          </Link>
          <Link to="/mechanical" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Mechanical Engineering</h3>
          </Link>
          <Link to="/aiml" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Artificial Intelligence & Machine Learning</h3>
          </Link>
          <Link to="/biotech" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Biotechnology</h3>
          </Link>
          <Link to="/ece" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>Electronics & Communication Engineering</h3>
          </Link>
          <Link to="/firstyear" className='p-5 border border-gray-300 rounded-lg text-center bg-gray-100 hover:bg-gray-200 transition'>
            <h3>First Year</h3>
          </Link>
        </div>


        <div className='bg-[#f0f4f8] p-5 rounded-lg mt-10 '>
          <h2>Why Choose Us?</h2>
          <ul className='font-[16px] '>
            <li>📚 Comprehensive collection of previous semester question papers</li>
            <li>🎯 Organized by department for easy navigation</li>
            <li>⏰ Updated regularly with latest exam papers</li>
          </ul>
        </div>

        <div className='bg-[#fff3cd] p-5 rounded-lg mt-10 '>
          <h2>How to Use</h2>
          <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
            <li>Select your department from the list above</li>
            <li>Browse through available semester papers</li>
            <li>Practice and prepare for your exams</li>
          </ol>
        </div>

        <div className='bg-[#e8f5e9] p-5 rounded-lg mt-10 flex items-center justify-center'>
          <p className='text-[#555] font-[16px]'>
            📧 For any queries or to contribute question papers, contact us at <strong>rynaktode11@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home