import React from "react";
import { Field, Form, Formik } from "formik";
import usePostemployeedata from "../../Hooks/EmployeeApiHooks/usePostemployeedata.jsx";
import { toast } from "react-toastify";

const EmployeeForm = ({close,refetch}) => {
  const {Postemployeedata} = usePostemployeedata()
  return (
    <div className="flex justify-center w-full items-center min-h-screen">
      <div className="w-full max-w-lg bg-white  p-8 rounded-2xl shadow-xl">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Employee
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) errors.name = "Name is required";
            if (!values.email) errors.email = "Email is required";
            if (!values.password) errors.password = "Password is required";
            if (!values.role) errors.role = "Role is required";
            return errors;
          }}
          onSubmit={async(values,{resetForm}) => {
            
            const result = await Postemployeedata(values)

            if(result){
              toast.success("Employee Added Successfully")
             await refetch?.()
              close(false)
              resetForm()             
            }
            else{
              toast.error("Employee Added Failed")
            }
           
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
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
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
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
                Submit
              </button>
              <button
                type="button"
                onClick={() => close(false)}
                className="w-full cursor-pointer hover:opacity-80 bg-gradient-to-l from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition duration-300"
              >
                Cancel
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
