import React from "react";
import { useSelector } from "react-redux";
import AdminAnalytics from "../../components/Dashboard/AdminAnalytics";
import EmployeeAnalytics from "../../components/Dashboard/EmployeeAnalytics";
import useAdminAnalytics from "../../Hooks/AnalyticsApi/useAdmin";
import useEmployeeAnalytics from "../../Hooks/AnalyticsApi/useEmployee";

const MainDashboard = () => {
  const user = useSelector((state) => state.userdata?.user);

  const {empid} = useSelector((state) => state.userdata?.user);
 
  const IsAdmin= user?.role === "ADMIN"
  const IsEmployee= user?.role === "EMPLOYEE"

  const {analyticsdata,loading} = useAdminAnalytics(IsAdmin)
  const {EmployeeAnalyticsData,Eloading} = useEmployeeAnalytics(empid, IsEmployee)
  console.log("EmployeeAnalyticsData",EmployeeAnalyticsData)
  


  return (
    <>
     {IsAdmin && (
      <div className="overflow-y-auto md:overflow-hidden styled-scrollbar">
        <AdminAnalytics data={analyticsdata} loading={loading} />
      </div>
     )}
     {IsEmployee && (
      <div className="overflow-y-auto md:overflow-hidden styled-scrollbar">
        <EmployeeAnalytics data={EmployeeAnalyticsData} loading={Eloading} />
      </div>
     )}

      {/* Bottom wave flipped */}
      <div className="absolute bottom-0 left-0 mb-1 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 transform rotate-180"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-orange-500/20"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default MainDashboard;
