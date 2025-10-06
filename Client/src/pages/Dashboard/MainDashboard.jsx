import React from "react";
import { useSelector } from "react-redux";
import AdminAnalytics from "../../components/Dashboard/AdminAnalytics";
import EmployeeAnalytics from "../../components/Dashboard/EmployeeAnalytics";
import useAdminAnalytics from "../../Hooks/AnalyticsApi/useAdmin";
import useEmployeeAnalytics from "../../Hooks/AnalyticsApi/useEmployee";
import useHansurjaAnalytics from "../../Hooks/AnalyticsApi/useHansurja";

  const MainDashboard = () => {
    const user = useSelector((state) => state.userdata?.user);
    const {hansurjaId} = useSelector((state) => state.userdata?.user);
    const {empid} = useSelector((state) => state.userdata?.user);
 
  const IsAdmin = user?.role === "ADMIN" || user?.role === "RECEPTIONIST";
  const IsEmployee= user?.role === "EMPLOYEE" 
  const IsHansurja = user?.role === "HANSURJAMITRA";

  const {analyticsdata,loading} = useAdminAnalytics(IsAdmin)
  const {EmployeeAnalyticsData,Eloading} = useEmployeeAnalytics(empid, IsEmployee)
  const {HansurjaAnalyticsData,Hloading} = useHansurjaAnalytics(hansurjaId, IsHansurja)


  return (
    <>
   <div className="overflow-y-auto styled-scrollbar h-screen ">

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
     {IsHansurja && (
      <div className="overflow-y-auto md:overflow-hidden styled-scrollbar">
        <EmployeeAnalytics data={HansurjaAnalyticsData} loading={Hloading} />
      </div>
     )}

   </div>

 

    </>
  );
};

export default MainDashboard;
