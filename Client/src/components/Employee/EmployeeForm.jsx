import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import usePostemployeedata from "../../Hooks/EmployeeApiHooks/usePostemployeedata.jsx";
import { toast } from "react-toastify";
import useEmployeUpdate from "../../Hooks/EmployeeApiHooks/useEmployeUpdate";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const EmployeeForm = ({
  close,
  refetch,
  closeedit,
  refetcheditdata,
  initialData,
  id,
}) => {
  const [loading, setloading] = useState(false);
  const [seepass, setseepass] = useState(false);
  const { Postemployeedata } = usePostemployeedata();
  const { UpdateApicall } = useEmployeUpdate();
  return (
    <div className="flex justify-center w-full items-center min-h-screen">
      <div className="w-full max-w-lg bg-white  p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {initialData ? "Update Employee" : "Add New Employee"}
        </h2>

        <Formik
          initialValues={{
            name: initialData?.name || "",
            email: initialData?.email || "",
            password: initialData?.normalpass || "",
            role: initialData?.role || "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = "Name is required";
            if (!values.email) errors.email = "Email is required";
            if (!values.password) errors.password = "Password is required";
            if (!values.role) errors.role = "Role is required";
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            setloading(true);
            let result;

            if (initialData) {
              result = await UpdateApicall(id, values);
              toast.success("Employee Updated Successfully");
              closeedit?.(false);
              refetcheditdata?.();
              resetForm();
              setloading(false);
            } else {
              setloading(true);
              result = await Postemployeedata(values);
              toast.success("Employee Added Successfully");
              close?.(false);
              refetch?.();
              resetForm();
              setloading(false);
            }

            // let result
            // await Postemployeedata(values)
            // if(result){
            //   toast.success("Employee Added Successfully")
            //  await refetch?.()
            //   close(false)
            //   resetForm()
            // }
            // else{
            //   toast.error("Employee Added Failed")
            // }
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Name
                </label>

                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>

                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm italic">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm italic">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <Field
                    type={seepass ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <span
                    onClick={() => setseepass(!seepass)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {seepass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm italic">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="EMPLOYEE">Employee</option>
                </Field>
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm italic">
                    {errors.role}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full cursor-pointer hover:opacity-80 bg-gradient-to-l from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition duration-300"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>{initialData ? "Updating" : "Adding"}</span>
                    </>
                  ) : initialData ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    initialData ? closeedit?.(false) : close?.(false)
                  }
                  className="w-full cursor-pointer hover:opacity-80 bg-gradient-to-l from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition duration-300"
                >
                  {initialData ? "Cancel" : "Close"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeForm;
