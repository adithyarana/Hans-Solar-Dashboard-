import React from 'react'
import { useNavigate } from 'react-router-dom'

const SubsidyLeadstages = ({data,loading}) => {
    const navigate = useNavigate();

    const { Registration,Application,Feasibility,Vendor_Selection,Upload_Agreement,Installation,Inspection,Project_Commissioning,Subsidy_Request,Subsidy_Disbursal} = data || {};

    const leadstagesData = [
      { label: "📝 Registration", value: Registration, color: "border-blue-500", key: "Registration" },
      { label: "📩 Application", value: Application, color: "border-yellow-500", key: "Application" },
      { label: "🔎 Feasibility", value: Feasibility, color: "border-green-500", key: "Feasibility" },
      { label: "🤝 Vendor Selection", value: Vendor_Selection, color: "border-purple-500", key: "Vendor_Selection" },
      { label: "📄 Upload Agreement", value: Upload_Agreement, color: "border-indigo-500", key: "Upload_Agreement" },
      { label: "🛠️ Installation", value: Installation, color: "border-teal-500", key: "Installation" },
      { label: "🔍 Inspection", value: Inspection, color: "border-orange-500", key: "Inspection" },
      { label: "🏁 Project Commissioning", value: Project_Commissioning, color: "border-red-500", key: "Project_Commissioning" },
      { label: "💰 Subsidy Request", value: Subsidy_Request, color: "border-pink-500", key: "Subsidy_Request" },
      { label: "🏦 Subsidy Disbursal", value: Subsidy_Disbursal, color: "border-green-500", key: "Subsidy_Disbursal" },
    ];
    
    return <div className="flex flex-col lg:flex-row gap-4">
      {/* Lead Stages */}
      <div className=" z-30 w-full  rounded-lg p-7   overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Subsidy Lead Stages 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 pr-2">
          {leadstagesData.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gray-50 cursor-pointer flex flex-col justify-center items-center h-[55px] border-l-4 ${item.color} rounded-lg shadow`}
              onClick={()=>navigate(`/dashboard/customers?page=1&limit=15&leadStage=${item.key}`)}
            >
              <p className="text-gray-600  font-semibold text-md">{item.label}</p>
              <p className="text-blue-600 font-semibold text-lg">{loading ? (
                <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                item.value || "0"
              )}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
}

export default SubsidyLeadstages