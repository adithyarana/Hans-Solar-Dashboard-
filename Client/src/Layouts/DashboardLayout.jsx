import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Navbar from '../components/Dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  
  return (
    <div className='flex h-screen overflow-hidden'>
       <div className='w-[15vw] h-screen'>
       <Sidebar/>
       </div>
         <div className='flex flex-col gap-5 overflow-hidden bg-gray-50  '>
         <Navbar/>
         <Outlet/>
         </div>
    </div>
  )
}

export default DashboardLayout