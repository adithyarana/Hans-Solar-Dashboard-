import React from "react";

const Filter = () => {
  return (
    <div className="ml-6">

      <form className="flex gap-8 flex-wrap">
        {/* Search by Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Lead Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Lead Status</label>
          <select className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
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
          <select className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
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
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Lead Created Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

       

        {/* Buttons - Full Width Row */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            type="submit"
            className="px-8 cursor-pointer font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:opacity-80 transition"
          >
            Search
          </button>
          <button
            type="reset"
            className="px-8 cursor-pointer font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
