import React from 'react'
import { FaFileExport } from "react-icons/fa6";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from 'react-toastify';

const ExportFile = ({data}) => {

  const handlexport = ()=>{

    // 
    if(!data || data.length === 0){
      toast.warning("No data to export")
      return;
    }

    // spread the location data 
    const flattendata = data.map((item)=>({
        customerid : item?.customerId,
        name:item?.name,
        email:item?.email,
        phoneNumber:item?.phoneNumber,
        whatsappNumber:item?.whatsappNumber,
        state:item?.state,
        district:item?.district,
        tehsil:item?.tehsil,
        village:item?.village,
        interestAreas:item?.interestAreas,
        address:item?.address,
        DOB:item?.birthday,
  
    }))
    // convert json in to worksheet 
    const worksheet = XLSX.utils.json_to_sheet(flattendata);

    // create workbook and add to sheet 
    const newbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newbook,worksheet,"CustomerData");

    // generate excel file and download

    const excelbuffer = XLSX.write(newbook, {bookType:"xlsx", type:"array"})
    const blob = new Blob([excelbuffer],{type:"application/octet-stream"})
    saveAs(blob , "customer-data.xlsx")
    
  }
  return (
    <div className='cursor-pointer mr-6 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-80 transition-all duration-300 ease-in-out'>
        <FaFileExport onClick={handlexport} className='text-white' size={25}/>
    </div>
  )
}

export default ExportFile