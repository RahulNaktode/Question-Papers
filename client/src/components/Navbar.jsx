import React, { useState } from 'react'
import { Link } from 'react-router';
import './../index.css'
import Contact from '../view/Contact';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='md:max-w-[85%] w-full bg-blue-400 rounded-full md:px-10 px-3 py-3 mx-auto sticky top-3 flex items-center justify-between shadow-lg z-50'>
      <div className='flex items-center md:gap-12 gap-3'>

        <div className='text-white'>
          <h1 className='md:font-bold md:text-xl text-sm leading-none press-start-2p-regular'>TGPQuestionPaper</h1>
        </div>

        <div className='relative'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center md:gap-2 text-sm md:text-xl text-white font-medium focus:outline-none'
          >
            Department
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              ▼
            </span>
          </button>

          {isOpen && (
            <ul className='absolute top-12 left-0 md:w-48 w-40 bg-white rounded-xl shadow-xl py-2 text-gray-800 animate-in fade-in zoom-in duration-200 z-50'>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/cse">CSE</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/ece">ECE</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/eee">EEE</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/mechanical">Mechanical</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/civil">Civil</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/ds">CSE-DS</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/biotech">BioTech</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/aero">Aero</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/it">IT</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/firstyear">FirstYear</Link>
              </li>
              <li className='px-4 md:py-2 py-1 hover:bg-blue-50 cursor-pointer transition-colors'>
                <Link to="/aiml">AIML</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Link to='/contact' className='flex items-center md:gap-2 gap-1 text-white font-medium focus:outline-none'>Contact</Link>
    </nav>
  )
}

export default Navbar