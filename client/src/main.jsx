import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './view/Home.jsx'
import ComputerScience from './view/Departements/ComputerScience.jsx'
import Electronics from './view/Departements/ECE.jsx'
import Electrical from './view/Departements/Electrical.jsx'
import Mechanical from './view/Departements/Mechanical.jsx'
import Civil from './view/Departements/Civil.jsx'
import Aero from './view/Departements/Aero.jsx'
import InformationTechnology from './view/Departements/InformationTechnology.jsx'
import DataScience from './view/Departements/DataScience.jsx'
import ArtificialIntelligence from './view/Departements/AIML.jsx'
import Biotechnology from './view/Departements/BioTechnology.jsx'
import FirstYear from './view/Departements/FirstYear.jsx'
import Contact from './view/Contact.jsx'
import Signup from './view/Signup.jsx'
import Login from './view/Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/contact' element={<Contact />} />
    <Route path="/cse" element={<ComputerScience />} />
    <Route path="/ece" element={<Electronics />} />
    <Route path="/eee" element={<Electrical />} />
    <Route path="/mechanical" element={<Mechanical />} />
    <Route path="/civil" element={<Civil />} />
    <Route path="/aero" element={<Aero />} />
    <Route path='/it' element={<InformationTechnology />} />
    <Route path='/ds' element={<DataScience />} />
    <Route path='/aiml' element={<ArtificialIntelligence />} />
    <Route path='/biotech' element={<Biotechnology />} />
    <Route path='/firstyear' element={<FirstYear />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/login' element={<Login />} />
  </Routes>
  </BrowserRouter>
)
