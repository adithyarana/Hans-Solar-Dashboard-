import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../../components/customerdata/Filter";
import CreateLeadForm from "../../components/customerdata/CreateLeadForm";
import Dataheading from "../../components/customerdata/Dataheading";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import useBulkupload from "../../Hooks/useBulkupload";
import usegetcustomerdata from "../../Hooks/usegetcustomerdata";
import { FaDeleteLeft } from "react-icons/fa6";
import ExportFile from "../../components/customerdata/ExportFile.jsx";
import { MdOutlineFileUpload } from "react-icons/md";
import Pagination from "../../components/Dashboard/Pagination.jsx";

const CustomersData = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const user = useSelector((state) => state.userdata?.user);
  
  // Get initial values from URL or use defaults
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const leadStageFromUrl = searchParams.get("leadStage") || "";
  const limit = 15;
  
  const [page, setPage] = useState(pageFromUrl);
  const [filter, setFilter] = useState(leadStageFromUrl ? { leadStage: leadStageFromUrl } : {});
  const [filteropen, setFilterOpen] = useState(false);
  const [uploadloading, setUploadLoading] = useState(false);
  
  // hooks
  const { file, setfile, handleFileChange, handlefileupload } = useBulkupload();
  const { customerData, loading, fetchCustomerData, totalpages, totalcount } = 
    usegetcustomerdata(page, limit, filter);
  
  // Update URL when filter or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    
    if (filter.leadStage) {
      params.set('leadStage', filter.leadStage);
    } else {
      params.delete('leadStage');
    }
    
    // Only update if there are actual changes to prevent infinite loops
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [page, filter, setSearchParams, searchParams]);
  
  // Handle initial load and URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const leadStageParam = params.get('leadStage');
    const pageParam = parseInt(params.get('page')) || 1;
    
    // Update local state from URL
    if (leadStageParam && leadStageParam !== filter.leadStage) {
      setFilter({ leadStage: leadStageParam });
    } else if (!leadStageParam && Object.keys(filter).length > 0) {
      setFilter({});
    }
    
    if (pageParam !== page) {
      setPage(pageParam);
    }
  }, [location.search]);
  

  // handle bulk uploads
  const handleupload = async()=>{
    
    setUploadLoading(true);
    let result ;
    result = await handlefileupload();
    if(result){
      await fetchCustomerData?.();
    }
    setUploadLoading(false);
  }

  // This effect is now handled by the URL update effect above
  
  useEffect(() => {
    // Check if we're coming back from a delete operation
    if (location.state?.shouldRefresh) {
      fetchCustomerData();  
      // Clear the state to prevent unnecessary refetches
      window.history.replaceState({}, document.title);
    } else {
      fetchCustomerData();
    }
  }, [fetchCustomerData, location.state]);

  const handleFilter = (criteria) => {
    if (!criteria || Object.keys(criteria).length === 0) {
      setFilter({});
      setPage(1);
      return;
    }
    
    setFilter(criteria);
    setPage(1);
  };                   


  return (
    <>
      <div className="flex justify-between items-center   gap-4">
        <div className=" bg-white w-full  text-gray-600 font-medium   p-5 text-xl border border-gray-300 mt-5 ml-14">
          Customer Data
        </div>

        <div className="flex items-center justify-center ">
          {user.role != "RECEPTIONIST" && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center mr-6 rounded-xl text-nowrap cursor-pointer hover:opacity-80 transition-all  
        bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-2 mt-4 gap-1"
            >
              <span className=" text-2xl">
                <FaPlus />
              </span>
            </button>
          )}

          {open && (
            <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto p-6">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

                <CreateLeadForm close={setOpen} refetch={fetchCustomerData} />
              </div>
            </div>
          )}

          {/* bulk upload */}
          {user.role == "ADMIN" && (
            <div className="flex justify-center items-center mt-3 gap-2">
              <div className="flex flex-col mb-8 gap-1">
                <label className="text-sm text-gray-600 mt-2 font-medium">
                  Upload data in bulk
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  id="bulkUpload"
                  className="hidden"
                />

                {/* Styled Label as Button */}
                <label
                  htmlFor="bulkUpload"
                  className="w-[180px] text-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 ease-in-out text-white font-medium cursor-pointer rounded-xl py-2 shadow-md hover:shadow-lg"
                >
                  Choose File
                </label>

                {file && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-wrap text-gray-600">{file.name}</span>
                    <button
                      onClick={() => setfile(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaDeleteLeft size={20}/>
                    </button>
                  </div>
                )}
              </div>
              <button
                disabled={uploadloading}
                onClick={handleupload}
                className="bg-gradient-to-r from-orange-500 to-red-500 font-medium px-4 py-2 mr-6 text-white rounded-xl items-center hover:opacity-80 gap-2 cursor-pointer"
              >
                {uploadloading ? "Uploading..." : <MdOutlineFileUpload size={25}/>}
              </button>
            </div>
          )}

       
           {/* <Filter /> */}
          <div className="flex items-center justify-center mt-3">
          <div className=" relative flex justify-end mr-5 ">
            {/* Button */}
            <span
              onClick={() => setFilterOpen(!filteropen)}
              className="flex hover:opacity-80  bg-gradient-to-b from-orange-500 to-red-500 px-4 py-3 rounded-xl items-center gap-2  cursor-pointer"
            >
              <FaFilter className="text-white" size={20} />
            </span>

            {/* Dropdown */}
            <div
              className={`z-50 absolute top-full mt-3 right-0 transform transition-all duration-300 ease-in-out ${
                filteropen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Filter
                leaddata={customerData}
                handleFilter={handleFilter}
                closefilter={setFilterOpen}
              />
            </div>
          </div>

          {/* export file */}
          <ExportFile data={customerData}/>
          </div>
       </div>


        </div>
      

        {/* data */}
      <Dataheading customerData={customerData} loading={loading} page={page} />
          
          {/* pagination */}
          {totalcount > 15 && (
               <div className="flex justify-end items-center mb-3 mr-14">
               <Pagination totalpages={totalpages} data={customerData} totalcount={totalcount} page={page} setpage={setPage} />
               </div>
          )}

    </>
  );
};

export default CustomersData;
