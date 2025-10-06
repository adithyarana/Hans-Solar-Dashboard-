import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import usepostdata from "../../Hooks/HUM/usepostdata";
import useUpdateHum from "../../Hooks/HUM/useupdate";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],           // headings
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }], // bullet points                       
      ["clean"],
    ],
  },

};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "emoji",
  "clean",
];


const CreateHumForm = ({
  close,
  refetch,
  closeedit,
  initialData,
  id,
  onSuccessId,
}) => {
  const [loading, setloading] = useState(false);
  const{postHumdata} = usepostdata()
  const{UpdateApicall} = useUpdateHum()
  return (
    <div className="max-w-6xl mx-auto p-6  bg-gray-50 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        <span className="text-orange-500 font-semibold">
          {" "}
          {initialData ? "Edit" : "Create"} Hum
        </span>
      </h2>

      <Formik
        initialValues={{
          name: initialData?.name || "",
          email: initialData?.email || "",
          phoneNumber: initialData?.phoneNumber || "",
          whatsappNumber: initialData?.whatsappNumber || "",
          password: initialData?.password || "",
          address: initialData?.address || "",
          birthday: initialData?.birthday || "",
          infoSource: initialData?.infoSource || "",
          notes: initialData?.notes || "",
          followUp: initialData?.followUp || "",
          workCategory: initialData?.workCategory || "",
          startDate: initialData?.startDate || "",
          state: initialData?.state || "",
          district: initialData?.district || "",
          tehsil: initialData?.tehsil || "",
          village: initialData?.village || "",
          aadhaarNumber: initialData?.aadhaarNumber || "",
          panNumber: initialData?.panNumber || "",
       
        }}
        enableReinitialize
        validate={(value) => {
          let errors = {};

          if (!value.name) errors.name = "Name is required";
          if(!value.email) errors.email = "Email is required";
          if(!value.password) errors.password = "Password is required";
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            // Create FormData instance
            const formData = new FormData();

            // Append non-nested fields (exclude location, images, attachments)
            Object.keys(values).forEach((key) => {
              if (
                ![
                  "birthday",
                  "followUp",
                  "startDate",
                ].includes(key)
              ) {
                formData.append(key, values[key] || "");
              }
            });

            // Handle date fields to ensure proper ISO-8601 format
            if (values.birthday)
              formData.append(
                "birthday",
                new Date(values.birthday).toISOString()
              );
            if (values.followUp)
              formData.append(
                "followUp",
                new Date(values.followUp).toISOString()
              );
            if (values.startDate)
              formData.append(
                "startDate",
                new Date(values.startDate).toISOString()
              );

            let result;
            setloading(true);
            if (initialData) {
              // update lead
              result = await UpdateApicall(id, formData);
              if (result) {
                toast.success("Hum updated successfully");
                // navigate("/dashboard/customers");
                closeedit?.(false);
                onSuccessId?.();
                setloading(false);
              }
            } else {
              // create lead
              setloading(true);
              result = await postHumdata(formData);
              if (result) {
                toast.success("Hum created successfully");
                resetForm();
                close?.(false);
                refetch?.();
                setloading(false);
              }
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                (initialData
                  ? "Failed to update Hum"
                  : "Failed to create Hum")
            );
          }
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">Name</label>
              <Field
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter name"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.name && touched.name && (
                <div className="text-red-500">{errors.name}</div>
              )}
            </div>

            {/* email*/}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <Field
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.email && touched.email && (
                <div className=" text-sm text-red-500">{errors.email}</div>
              )}
            </div>

                 {/* Password */}
                 <div>
              <label className="block font-medium mb-1">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.password && touched.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <Field
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
              
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block font-medium mb-1">WhatsApp Number</label>
              <Field
                type="text"
                name="whatsappNumber"
                value={values.whatsappNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter WhatsApp number"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
           
            </div>

      

            {/* Birthday */}
            <div>
              <label className="block font-medium mb-1">DOB</label>
              <Field
                type="date"
                name="birthday"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Info Source */}
            <div>
              <label className="block font-medium mb-1">Lead Source</label>
              <Field
                type="text"
                name="infoSource"
                placeholder="Enter info source"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>



            {/* Work Category */}
            <div>
              <label className="block font-medium mb-1">Work Category</label>
              <Field
                type="text"
                name="workCategory"
                placeholder="Enter work category"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <Field
                type="date"
                name="startDate"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Follow Up Date</label>
              <Field
                type="date"
                name="followUp"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

        


            {/* Location (State, District, Tehsil, Village) */}
            <div>
              <label className="block font-medium mb-1">State</label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
                name="state"
                id=""
              >
                <option>Select State</option>
                {indianStates.map((state, idx) => (
                  <option className="text-gray-500 " key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">District</label>
              <Field
                type="text"
                name="district"
                placeholder="Enter district"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tehsil</label>
              <Field
                type="text"
                name="tehsil"
                placeholder="Enter tehsil"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Village</label>
              <Field
                type="text"
                name="village"
                placeholder="Enter village"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Aadhaar Number</label>
              <Field
                type="text"
                name="aadhaarNumber"
                placeholder="Enter aadhaar number"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Pan Number</label>
              <Field
                type="text"
                name="panNumber"
                placeholder="Enter pan number"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>

            
            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Address</label>
              <Field
                type="text"
                name="address"
                placeholder="Enter address"
                className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* notes */}
            <div className="md:col-span-3">
              <label className="block font-medium mb-1">Notes</label>
              <div className="border rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-orange-300">
                <ReactQuill
                  theme="snow"
                  value={values.notes}
                  onChange={(val) => setFieldValue("notes", val)}
                  className="bg-white"
                  style={{ height: 300 }}
                  placeholder="Write important notes, context, or next steps..."
                  modules={modules}
                  formats={formats}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {((values.notes || "").replace(/<[^>]+>/g, "").trim()).length} characters
              </div>
            </div>

  
            {/* Submit */}
            <div className="md:col-span-3 flex justify-end items-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 mt-4 font-semibold cursor-pointer hover:opacity-90 transition-all text-white rounded-full shadow bg-gradient-to-r from-orange-500 to-red-500 flex justify-center items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
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
                    <span>{initialData ? "Updating..." : "Creating..."}</span>
                  </>
                ) : (
                  <span>{initialData ? "Update" : "Create"}</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateHumForm;
