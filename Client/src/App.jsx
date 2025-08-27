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
import EmployesData from './pages/Dashboard/EmployesData.jsx'
import CustomerDetailsPage from './pages/Dashboard/CustomerDetailsPage.jsx'
import Protectedroutes from './utils/Protectedroutes'


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
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  />
  </Provider>
  </div>
  )
}

export default App
