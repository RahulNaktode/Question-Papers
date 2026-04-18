import React from 'react'
import Input from './Input'

// We pass searchTerm and setSearchTerm as props so the parent 
// component stays in control of the state.
function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full md:w-80">
      <div className="relative">
        <Input 
          type="text"
          placeholder="🔍 Search subject or semester..."
          className="w-full p-2 border-2 border-blue-100 rounded-lg focus:border-blue-500 outline-none shadow-sm transition-all bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Optional: Clear button if text exists */}
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default Search