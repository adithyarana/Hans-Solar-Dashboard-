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

             {/* footer */}
         <footer className='text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-gray-500 shadow  ml-4 z-30 '>
         <p>© 2025 Hans Solar Dashboard. All rights reserved.</p>
         </footer>
         </div>

     
    </div>
  )
}

export default DashboardLayout