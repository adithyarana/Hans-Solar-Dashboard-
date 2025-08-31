import React, { useState } from "react";

const indianStates = [
  "Select State",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];


const Filter = ({leaddata}) => {
  const [filter , setfilter]=useState({
    name:"",
    leadStage:"",
    priority:"",
    customerId:"",
    leadCreatedDate:"",
    state:"",
  })

  const handlechange = (e)=>{
    setfilter({...filter,[e.target.name]:e.target.value})
  }

  const handleSearch =(e)=>{
    e.preventDefault()

    const filterdata = leaddata?.filter((data)=>{
      return (
        data?.name?.toLowerCase().includes(filter?.name?.toLowerCase()) &&
        data?.leadStage?.toLowerCase().includes(filter?.leadStage?.toLowerCase()) &&
        data?.priority?.toLowerCase().includes(filter?.priority?.toLowerCase()) &&
        data?.customerId?.toLowerCase().includes(filter?.customerId?.toLowerCase()) &&
        (data?.leadCreatedDate === "" ||
          new Date(data?.createdAt).toISOString().split("T")[0] ===
            data?.leadCreatedDate)  &&
        data?.state?.toLowerCase().includes(filter?.state?.toLowerCase())
      )
    })

    setfilter(filterdata)
    
  }

  const handleReset =()=>{
    setfilter({
      name:"",
      leadStage:"",
      priority:"",
      customerId:"",
      leadCreatedDate:"",
      state:"",
    })
    setfilter(leaddata)
  }

  return (
    <div className="ml-6">
      <form className="grid grid-cols-5 gap-6 bg-white shadow-lg rounded-xl p-6 w-[1000px]">
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={filter.name}
            onChange={handlechange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Lead Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Lead Status</label>
          <select name="leadStage" value={filter.leadStage} onChange={handlechange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
            <option value="">Select Status</option>
            <option value="NEW_LEAD">New Lead</option>
            <option value="In Process">In Process</option>
            <option value="Qualified">Qualified</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Site Visit Done">Site Visit Done</option>
            <option value="Estimate Sent">Estimate Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Lead Lost">Lead Lost</option>
            <option value="On Hold">On Hold</option>
            <option value="Lead Won">Lead Won</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select name="priority" value={filter.priority} onChange={handlechange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Customer ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Customer ID</label>
          <input
            type="text"
            placeholder="Enter customer ID"
            name="customerId"
            value={filter.customerId}
            onChange={handlechange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Lead Created Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Lead Created Date</label>
          <input
            type="date"
            name="leadCreatedDate"
            value={filter.leadCreatedDate}
            onChange={handlechange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select name="state" value={filter.state} onChange={handlechange} className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
            {indianStates.map((state, idx) => (
              <option key={idx} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons - Full Row */}
        <div className="col-span-3 flex gap-4 mt-4">
          <button
          onClick={(e)=>e.preventDefault()}
            type="submit"
            className="px-8 py-2 cursor-pointer font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:opacity-80 transition"
          >
            Search
          </button>
          <button
            type="reset"
            className="px-8 py-2 cursor-pointer font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
