import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Home from './view/Home.jsx'
import ComputerScience from './view/Departements/ComputerScience.jsx'
import Electronics from './view/Departements/DataScience.jsx'
import Electrical from './view/Departements/Electrical.jsx'
import Mechanical from './view/Departements/Mechanical.jsx'
import Civil from './view/Departements/Civil.jsx'
import Aero from './view/Departements/Aero.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cse" element={<ComputerScience />} />
    <Route path="/ece" element={<Electronics />} />
    <Route path="/eee" element={<Electrical />} />
    <Route path="/mechanical" element={<Mechanical />} />
    <Route path="/civil" element={<Civil />} />
    <Route path="/aero" element={<Aero />} />
  </Routes>
  </BrowserRouter>
)
