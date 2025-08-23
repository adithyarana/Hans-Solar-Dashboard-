import React from "react";
import { Formik, Form } from "formik";
import useauth from "../../Hooks/useauth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

const Login = () => {
  const { Apicall } = useauth();
  const navigate = useNavigate();
  // const userdata = useSelector((state)=>state.userdata?.user)
  // console.log("user data",userdata)

  return (
    <>
      <div className="flex flex-col md:flex-row xl:flex-row 2xl:flex-row h-screen ">
        <div className="w-1/2 flex bg-[#FCFBF4]  justify-center items-center">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validate={(value) => {
              let errors = {};
              if (!value.name) errors.name = "Name is required";
              if (!value.email) errors.email = "Email is required";
              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
                errors.email = "Invalid email format";
              if (!value.password) errors.password = "Password is required";
              return errors;
            }}
            onSubmit={async (value, { resetForm }) => {
              try {
                const user = await Apicall(
                  value.name,
                  value.email,
                  value.password
                );

                if (user) {
                  toast.success("Login successful");
                  resetForm();
                  navigate("/dashboard");
                }
              } catch (error) {
                toast.error("Invalid credentials");
              }
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form className="flex flex-col justify-center  gap-4  p-4 h-screen w-[40vw]">
                <h1 className="mb-17 text-orange-500 text-wrap text-2xl font-bold md:text-4xl xl:text-4xl 2xl:text-4xl">
                  Both Admin and Employee can Sign In
                </h1>
                <label
                  className="text-lg font-semibold text-left w-full"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="border border-gray-300 rounded p-2"
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}

                <label
                  className="text-lg font-semibold text-left w-full"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded p-2"
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}

                <label
                  className="text-lg font-semibold text-left w-full"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-gray-300 rounded p-2"
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500">{errors.password}</div>
                )}

                <button
                  className="bg-gradient-to-r from-orange-500 to-green-500 text-lg font-semibold text-white p-2 rounded w-full cursor-pointer hover:opacity-80"
                  type="submit"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-orange-300 to-green-200 ">
          <img
            src="LoginBanner.png"
            alt="login illustration"
            className="w-[600px] object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
