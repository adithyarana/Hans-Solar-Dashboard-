import React from 'react'

const DeletePopup = ({close , onDelete , loading}) => {

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px] text-center">
      
      {/* Warning icon */}
      <div className="flex items-center justify-center mb-4">
        <span className="text-orange-400 text-6xl">!</span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Are you sure?
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        You won't be able to revert this!
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={()=>onDelete()}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
        >
          {loading ? "Deleting..." : "Yes, delete it!"}
        </button>
        <button
          onClick={()=>close(false)}
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeletePopup