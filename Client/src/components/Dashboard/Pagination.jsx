import React, { useEffect } from 'react'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";

const Pagination = ({totalpages , totalcount , data , page , setpage }) => {


  return (
    <div className='z-30 flex gap-3 '>

        <button
        className='cursor-pointer'
         onClick={()=>setpage(page-1)} disabled={page === 1}>
        <FaCircleChevronLeft className='bg-white text-orange-500 rounded-full' size={23}/>  
        </button>

        <span className='text-gray-600'>{page} / {totalpages}</span>
        
        <button
        className='cursor-pointer'
         onClick={()=>setpage(page+1)} disabled={page === totalpages}>
        <FaCircleChevronRight className='bg-white text-orange-500 rounded-full' size={23}/>  
        </button>
    </div>
  )
}

export default Pagination