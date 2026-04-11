import React from 'react'

function Input({type, name, value, placeholder,onChange, onClick}) {
  return (
    <div>
      <input 
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        className='px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 '
      />
    </div>
  )
}

export default Input
