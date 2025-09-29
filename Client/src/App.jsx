import "./App.css";
import Login from "./pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./utils/store";
import DashboadLayout from "./Layouts/DashboardLayout.jsx";
import Protectedroutes from "./utils/Protectedroutes";
import { lazy, Suspense } from "react";


// using lazy loading

const MainDashboard = lazy(() => import("./pages/Dashboard/MainDashboard"));
const CustomersData = lazy(() => import("./pages/Dashboard/CustomersData"));
const EmployesData = lazy(() => import("./pages/Employee/EmployesData"));
const CustomerDetailsPage = lazy(() =>
  import("./pages/Dashboard/CustomerDetailsPage")
);
const Profile = lazy(() => import("./pages/Dashboard/Profile"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboadLayout />,
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Protectedroutes>
              <MainDashboard />
            </Protectedroutes>
          </Suspense>
        ),
      },
      {
        path: "/dashboard/customers",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Protectedroutes>
              <CustomersData />
            </Protectedroutes>
          </Suspense>
        ),
      },
      {
        path: "/dashboard/employees",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Protectedroutes>
              <EmployesData />
            </Protectedroutes>
          </Suspense>
        ),
      },
      {
        path: "/dashboard/customers/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Protectedroutes>
              <CustomerDetailsPage />
            </Protectedroutes>
          </Suspense>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Protectedroutes>
              <Profile />
            </Protectedroutes>
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={Router} />
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
  );
}

export default App;
