import React from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const NotesViwer = ({notesdata}) => {

  

  return (
    <>
     {/* notes (view only) */}
     <div className="md:col-span-3">
          <label className="block text-gray-500 font-medium mb-1">Notes</label>
          <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
            <ReactQuill
              theme="snow"
              value={notesdata.notes || "No Notes Created !"}
              readOnly={true}
              modules={{ toolbar: false }}
              className="bg-white"
              style={{ height: "200px" }} 
            />
          </div>
        </div>
    </>
  )
}

export default NotesViwer