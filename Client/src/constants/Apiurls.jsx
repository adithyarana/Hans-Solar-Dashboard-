const Baseurl = "http://localhost:3000/api"

export const LoginApi = `${Baseurl}/login`
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




 export const stageColors = {
    "NEW_LEAD": "bg-blue-100 text-blue-700",          
    "IN_PROCESS": "bg-yellow-100 text-yellow-800",   
    "QUALIFIED": "bg-green-100 text-green-700",      
    "SITE_VISIT_SCHEDULE": "bg-purple-100 text-purple-700", 
    "SITE_VISIT_DONE": "bg-indigo-100 text-indigo-700",     
    "ESTIMATE_SENT": "bg-teal-100 text-teal-700",    
    "NEGOTIATION": "bg-orange-100 text-orange-700", 
    "LEAD_LOST": "bg-gray-200 text-gray-700",        
    "ON_HOLD": "bg-pink-100 text-pink-700",          
    "LEAD_WON": "bg-green-200 text-green-900 font-semibold", 
  };

  export const Prioritycolor ={
    "LOW": "bg-red-100 text-red-700",
    "MEDIUM": "bg-yellow-100 text-yellow-700",
    "HIGH": "bg-green-100 text-green-700",
   };
  