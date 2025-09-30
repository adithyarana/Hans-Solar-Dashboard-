import React from "react";
import { SiGoogleanalytics } from "react-icons/si";
import { IoAnalyticsSharp } from "react-icons/io5";
import Leadstages from "./AnalyticsComponents/Leadstages";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAnalytics = ({ data, loading }) => {

  const user = useSelector((state)=>state.userdata?.user)
  const navigate = useNavigate();
  const { totalcustomer, totalemployee, totalreceptionist } = data;
  const { LEAD_LOST, LEAD_WON } = data?.leadstage || {};
  


  const handleleadstage = (leadstage)=>{
    navigate(`/dashboard/customers?page=1&limit=15&leadStage=${leadstage}`);
  }

  return (
    <>
      <div className="flex gap-2 flex-col">
        <h2 className="text-2xl flex items-center gap-1 text-gray-500 font-semibold px-3 md:px-0">
          <span>
            <SiGoogleanalytics size={24} />
          </span>
          Dashboard
        </h2>
        <div>
          <div className="bg-orange-50 shadow w-full min-h-[250px] rounded-lg">
            <h2 className="text-md flex items-center gap-1 text-gray-600 font-semibold px-5 py-4">
              <span>
                <IoAnalyticsSharp size={22} />
              </span>
              OPR Dashboard
            </h2>

           {user.role ==="ADMIN" ? (
             <div className="flex flex-col md:flex-row md:justify-between md:items-center px-5">
             <h2 className="text-md text-gray-600 font-semibold py-1">OPEN</h2>
             <h2 className="text-md text-gray-600 font-semibold py-1 md:mr-[370px] hidden md:block">
               RESULT
             </h2>
           </div>
           ):(
            <div className="flex flex-col md:flex-row md:justify-items-start gap-[280px] md:items-center px-5">
            <h2 className="text-md text-gray-600 font-semibold py-1">OPEN</h2>
            <h2 className="text-md text-gray-600 font-semibold py-1 md:mr-[370px] hidden md:block">
              RESULT
            </h2>
          </div>
           )}

            {/* boxes with horizontal scroll on mobile */}
            <div className="px-5 py-3 ">
              <div className="flex gap-5 flex-nowrap md:flex-wrap justify-start md:justify-start min-w-max">
                {/* box1 */}
                <div className="bg-white cursor-pointer flex flex-col justify-center items-center w-[240px] h-[100px] border-l-4 border-orange-500 rounded-lg shadow shrink-0">
                  <p className="text-gray-600 font-semibold text-md">
                    Total Leads
                  </p>
                  <p className="text-orange-500 font-semibold text-lg">
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      totalcustomer || "0"
                    )}
                  </p>
                </div>

                {/* box2 */}
                {user?.role === "ADMIN" && (
                  <div className="bg-white cursor-pointer flex flex-col justify-center items-center w-[240px] h-[100px] border-l-4 border-yellow-500 rounded-lg shadow shrink-0">
                    <p className="text-gray-600 font-semibold text-md">
                      Total Employee
                    </p>
                    <p className="text-orange-500 font-semibold text-lg">
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        totalemployee || "0"
                      )}
                    </p>
                  </div>
                )}

                {/* box3 */}
               {user?.role === "ADMIN" && (
                <div className="bg-white cursor-pointer flex flex-col justify-center items-center w-[240px] h-[100px] border-l-4 border-blue-500 rounded-lg shadow shrink-0">
                  <p className="text-gray-600 font-semibold text-md">
                    Total Receptionist
                  </p>
                  <p className="text-orange-500 font-semibold text-lg">
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      totalreceptionist || "0"
                    )}
                  </p>
                </div>
               )}

                {/* Vertical line (only for desktop) */}
                <div className="hidden md:block w-[1px] h-[120px] bg-gray-300 mx-5"></div>

                {/* box4 */}
                <div onClick={()=>handleleadstage("LEAD_WON")} className="bg-white cursor-pointer flex flex-col justify-center items-center w-[200px] h-[100px] border-l-4 border-green-500 rounded-lg shadow shrink-0">
                  <p className="text-gray-600 font-semibold text-md">
                    Lead Won
                  </p>
                  <p className="text-green-500 font-semibold text-lg">
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      LEAD_WON || "0"
                    )}
                  </p>
                </div>

                {/* box5 */}
                <div onClick={()=>handleleadstage("LEAD_LOST")} className="bg-white cursor-pointer flex flex-col justify-center items-center w-[200px] h-[100px] border-l-4 border-red-500 rounded-lg shadow shrink-0">
                  <p className="text-gray-600 font-semibold text-md">
                    Lead Lost
                  </p>
                  <p className="text-red-500 font-semibold text-lg">
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      LEAD_LOST || "0"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* leadstage dashboard */}
      <Leadstages prioritydata={data?.priority} data={data?.leadstage} loading={loading} />
    </>
  );
};

export default AdminAnalytics;
