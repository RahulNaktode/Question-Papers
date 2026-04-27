import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import SubNavbar from '../components/SubNavbar'
import { Link } from 'react-router'

function Signup() {
  return (
    <div>
      <SubNavbar />
    
    <div className='w-130 border border-gray-600 rounded-lg p-4 gap-4 mx-auto mt-25'>
      <h2 className='text-2xl font-bold text-center mb-3'>Signup</h2>
      <Input type='text' placeholder='Enter Name' />
      <Input type='text' placeholder='Enter Email' />
      <Input type='password' placeholder='Enter password' />
      <Button title='Signup' />
      <Link to='/login' className='text-blue-500 hover:underline text-lg flex items-center justify-center'>Already have an account? Login</Link>
    </div>
    </div>
  )
}

export default Signup
