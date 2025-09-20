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

const empid = [
  "HANS01",
  "HANS02", 
  "HANS03",
  "HANS04",
  "HANS05",
  "HANS06",
  "HANS07",
  "HANS08",
  "HANS09",
  "HANS10",
  "HANS11",
  "HANS12",
  "HANS13",
  "HANS14",
  "HANS15",
  "HANS16",
  "HANS17",
  "HANS18",
  "HANS19",
  "HANS20",
]

const Filter = ({ handleFilter, closefilter }) => {
  const [filter, setFilter] = useState({
    name: "",
    leadStage: "",
    priority: "",
    customerId: "",
    state: "",
    district: "",
    tehsil: "",
    village: "",
    createdByEmpId: "",
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Create a clean filter object with only the fields that have values
    const cleanFilter = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    handleFilter(cleanFilter);
  };

  const handleReset = () => {
    const resetFilter = {
      name: "",
      leadStage: "",
      priority: "",
      customerId: "",
      // Using string value for state as expected by the backend
      state: "",
      district: "",
      tehsil: "",
      village: "",
      createdByEmpId: "",
    };
    setFilter(resetFilter);
    handleFilter({}); 
  };

  return (
    <div className="ml-6">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-5 gap-6 bg-orange-50 shadow-lg rounded-xl p-6 w-[1000px]"
      >
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={filter.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Lead Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Lead Status</label>
          <select
            name="leadStage"
            value={filter.leadStage}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Status</option>
            <option value="NEW_LEAD">New Lead</option>
            <option value="IN_PROCESS">In Process</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="SITE_VISIT_SCHEDULE">Site Visit Scheduled</option>
            <option value="SITE_VISIT_DONE">Site Visit Done</option>
            <option value="ESTIMATE_SENT">Estimate Sent</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="LEAD_LOST">Lead Lost</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="LEAD_WON">Lead Won</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={filter.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
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
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

       

        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            name="state"
            value={filter.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select State</option>
            {indianStates.filter(state => state !== "Select State").map((state, idx) => (
              <option key={idx} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

{/* // district */}
        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <input
          type="text" 
          placeholder="Enter district"
          name="district" 
          value={filter.district}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

        </div>

        {/* tehsil */}
        <div>
          <label className="block text-sm font-medium mb-1">Tehsil</label>
          <input
          type="text" 
          placeholder="Enter tehsil"
          name="tehsil" 
          value={filter.tehsil}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

        </div>

        {/* village */}
        <div>
          <label className="block text-sm font-medium mb-1">Village</label>
          <input
          type="text" 
          placeholder="Enter village"
          name="village" 
          value={filter.village}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

        </div>

                {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-nowrap mb-1">Search Employee data by ID</label>
          <select
            type="text" 
            placeholder="Enter employee ID"
            name="createdByEmpId" 
            value={filter.createdByEmpId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select ID</option>
            {empid.map((id , idx)=>(
              <option key={idx} value={id}>{id}</option>
            ))}
          </select>
        </div>

        {/* Buttons - Full Row */}
        <div className="col-span-3 flex gap-4 mt-4">
          <button
            onClick={() => {
              closefilter(false)
            }}
            type="submit"
            className="px-8 py-2 cursor-pointer font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:opacity-80 transition"
          >
            Search
          </button>
          <button
            onClick={handleReset}
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
