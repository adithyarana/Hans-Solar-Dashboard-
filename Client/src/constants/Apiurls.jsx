const API_ORIGIN = import.meta.env.VITE_BACKEND_URL;
const Baseurl = `${API_ORIGIN}/api`
const BaseUrl2 = `${API_ORIGIN}/api/mediafolder`  

export const LoginApi = `${Baseurl}/login`
export const LoginHansUrja = `${Baseurl}/loginHansUrja`
export const PostBulkUpload = `${Baseurl}/customer/bulkuploaddata`
export const PostCustomerData = `${Baseurl}/customer/addcustomerdata`
export const GetCustomerData = `${Baseurl}/customer/getallcustomerdata`
export const GetCustomerDataById = `${Baseurl}/customer/getcustomerbyid/`
export const DeleteLead = `${Baseurl}/customer/deletecustomer/`
export const UpdateLead = `${Baseurl}/customer/updatecustomer/`
export const PostEmployeeData = `${Baseurl}/registerEmployee`
export const GetEmployeeData = `${Baseurl}/getEmployeeData`
export const DeleteEmployeeData = `${Baseurl}/deleteEmployeeData/`
export const UpdateEmployeeData = `${Baseurl}/updateEmployeeData/`
export const AdminAnalytics = `${Baseurl}/adminanalytics`
export const EmployeeAnalytics = `${Baseurl}/employeeanalytics/:`
export const CreateAttachment = `${BaseUrl2}/createfolder`
export const GetallFolder = `${BaseUrl2}/getallmediafolderdata`
export const DeleteFolderApi = `${BaseUrl2}/deletefolder/`
export const GetFolderdatabyId = `${BaseUrl2}/getfolder/`
export const HansUrjaAnalytics = `${Baseurl}/hansurjaanalytics/:`
export const PostHumData = `${Baseurl}/registerHansUrja`
export const Getallhumdata = `${Baseurl}/getHunsurjaData`
export const GetHumDataById = `${Baseurl}/getHunsurjaById/`
export const UpdateHumData = `${Baseurl}/updateHunsurjaData/`
export const DeleteHumData = `${Baseurl}/deleteHunsurjaData/`


 export const stageColors = {
    "NEW_LEAD": "bg-blue-100 text-blue-700",          
    "IN_PROCESS": "bg-yellow-100 text-yellow-800",   
    "QUALIFIED": "bg-green-100 text-green-700",      
    "SITE_VISIT_SCHEDULE": "bg-purple-100 text-purple-700", 
    "SITE_VISIT_DONE": "bg-indigo-100 text-indigo-700",     
    "ESTIMATE_SENT": "bg-teal-100 text-teal-700",    
    "NEGOTIATION": "bg-orange-100 text-orange-700", 
    "LEAD_LOST": "bg-red-200 text-red-700",        
    "ON_HOLD": "bg-pink-100 text-pink-700",          
    "LEAD_WON": "bg-green-200 text-green-900 font-semibold", 
    "Registration": "bg-blue-100 text-blue-700",          
    "Application": "bg-yellow-100 text-yellow-800",   
    "Feasibility": "bg-green-100 text-green-700",      
    "Vendor_Selection": "bg-purple-100 text-purple-700", 
    "Upload_Agreement": "bg-indigo-100 text-indigo-700",     
    "Installation": "bg-teal-100 text-teal-700",    
    "Inspection": "bg-orange-100 text-orange-700", 
    "Project_Commissioning": "bg-red-200 text-red-700",        
    "Subsidy_Request": "bg-pink-100 text-pink-700",          
    "Subsidy_Disbursal": "bg-green-200 text-green-900 font-semibold", 
  };

  export const Prioritycolor ={
    "LOW": "bg-red-100 text-red-700",
    "MEDIUM": "bg-yellow-100 text-yellow-700",
    "HIGH": "bg-green-100 text-green-700",
   };
  