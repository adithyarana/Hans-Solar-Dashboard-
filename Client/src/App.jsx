import './App.css'
import Login from './pages/auth/Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainDashboard from './pages/Dashboard/MainDashboard'
import { Provider } from 'react-redux'
import store from './utils/store'
import DashboadLayout from './Layouts/DashboardLayout.jsx'
import CustomersData from './pages/Dashboard/CustomersData.jsx'
import EmployesData from './pages/Employee/EmployesData.jsx'
import CustomerDetailsPage from './pages/Dashboard/CustomerDetailsPage.jsx'
import Protectedroutes from './utils/Protectedroutes'
import Profile from './pages/Dashboard/Profile.jsx'


const Router = createBrowserRouter([ 
  {
    path: "/",
    element: <Login/>,
  },
  {
   
        path: "/",
        element: <DashboadLayout/>,
        children:[
          {
            path:"/dashboard",
            element:<Protectedroutes><MainDashboard/></Protectedroutes>
          },
          {
            path:"/dashboard/customers",
            element:<Protectedroutes><CustomersData/></Protectedroutes>
          },
          {
            path:"/dashboard/employees",
            element:<Protectedroutes><EmployesData/></Protectedroutes>
          },{
            path:"/dashboard/customers/:id",
            element:<Protectedroutes><CustomerDetailsPage/></Protectedroutes>
          },
          {
            path:"/dashboard/profile",
            element:<Protectedroutes><Profile/></Protectedroutes>
          }
        ]
  },
 

])

function App() {

  return (
  <div>
  <Provider store={store}>
  <RouterProvider router={Router}/>
  <ToastContainer
  position="top-center"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  toastStyle={{
    background: "linear-gradient(135deg, #ff7b54, #ffb347)",
    color: "#fff",
    borderRadius: "12px",
    padding: "14px 20px",
    fontSize: "15px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }}
  bodyClassName={() => "flex items-center text-sm font-medium"}
  progressStyle={{ background: "#fff176" }} 
/>

  </Provider>
  </div>
  )
}

export default App
