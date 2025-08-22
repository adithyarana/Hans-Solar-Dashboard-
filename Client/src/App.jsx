import './App.css'
import Login from './pages/auth/Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainDashboard from './pages/Dashboard/MainDashboard'
import { Provider } from 'react-redux'
import store from './utils/store'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <MainDashboard/>,
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
