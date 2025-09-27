import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import Navbar from '../components/Dashboard/Navbar'
import { Outlet, useNavigation } from 'react-router-dom'

const DashboardLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  
  return (
    <div className='flex h-screen overflow-hidden'>
       <div className='w-[15vw] h-screen'>
       <Sidebar/>
       </div>
         <div className='flex flex-col gap-5 overflow-hidden   '>
         <Navbar/>
         {/* Top loading bar during route transitions */}
         <div className={`h-1 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 ${isLoading ? 'w-full opacity-80' : 'w-0 opacity-0'}`} />
         <Outlet/>
         </div>
    </div>
  )
}

export default DashboardLayout