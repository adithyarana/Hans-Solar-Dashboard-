import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import usePostcustomerData from "../../Hooks/usePostcustomerData";
import { toast } from "react-toastify";
import useUpdateLead from "../../Hooks/useUpdateLead";

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

const CreateLeadForm = ({
  close,
  refetch,
  closeedit,
  initialData,
  id,
  onSuccessId,
}) => {
  const [loading, setloading] = useState(false);
  const { Apicall } = usePostcustomerData(); // custom hook for post customer data
  const { UpdateApicall } = useUpdateLead();
  return (
    <div className="max-w-6xl mx-auto p-6  bg-white rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        <span className="text-orange-500 font-semibold">
          {" "}
          {initialData ? "Edit" : "Create"} Lead
        </span>
      </h2>

      <Formik
        initialValues={{
          name: initialData?.name || "",
          email: initialData?.email || "",
          phoneNumber: initialData?.phoneNumber || "",
          whatsappNumber: initialData?.whatsappNumber || "",
          interestAreas: initialData?.interestAreas || "",
          address: initialData?.address || "",
          birthday: initialData?.birthday || "",
          infoSource: initialData?.infoSource || "",
          notes: initialData?.notes || "",
          followUp: initialData?.followUp || "",
          workCategory: initialData?.workCategory || "",
          reelsVideo: initialData?.reelsVideo || "",
          startDate: initialData?.startDate || "",
          leadStage: initialData?.leadStage || "NEW_LEAD",
          priority: initialData?.priority || "LOW",
          progressBoard: initialData?.progressBoard || "",
          state: initialData?.state || "",
          district: initialData?.district || "",
          tehsil: initialData?.tehsil || "",
          village: initialData?.village || "",
          // images: initialData?.images || [],
          // attachments: initialData?.attachments || [],
        }}
        enableReinitialize
        validate={(value) => {
          let errors = {};

          if (!value.name) errors.name = "Name is required";
          if(!value.phoneNumber) errors.phoneNumber = "Phone number is required";
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
                  "images",
                  "attachments",
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

       

            // // Handle images
            // if (values.images && values.images.length > 0) {
            //   Array.from(values.images).forEach((file) => {
            //     if (file instanceof File) {
            //       formData.append("images", file); // ✅ new files
            //     } else {
            //       formData.append("images", file); // ✅ keep old URLs
            //     }
            //   });
            // }

            // // Handle attachments
            // if (values.attachments && values.attachments.length > 0) {
            //   Array.from(values.attachments).forEach((file) => {
            //     if (file instanceof File) {
            //       formData.append("attachments", file); // ✅ new files
            //     } else {
            //       formData.append("attachments", file); // ✅ keep old URLs
            //     }
            //   });
            // }

            let result;
            setloading(true);
            if (initialData) {
              // update lead
              result = await UpdateApicall(id, formData);
              if (result) {
                toast.success("Lead updated successfully");
                // navigate("/dashboard/customers");
                closeedit?.(false);
                onSuccessId?.();
                setloading(false);
              }
            } else {
              // create lead
              setloading(true);
              result = await Apicall(formData);
              if (result) {
                toast.success("Lead created successfully");
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
                  ? "Failed to update lead"
                  : "Failed to create lead")
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
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
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
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.email && touched.email && (
                <div className=" text-sm text-red-500">{errors.email}</div>
              )}
            </div>


            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <Field
                type="number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
                 {errors.phoneNumber && touched.phoneNumber && (
              <div className="text-red-500">{errors.phoneNumber}</div>
            )}

            </div>
         
            {/* WhatsApp Number */}
            <div>
              <label className="block font-medium mb-1">WhatsApp Number</label>
              <Field
                type="number"
                name="whatsappNumber"
                placeholder="Enter WhatsApp number"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Address</label>
              <Field
                type="text"
                name="address"
                placeholder="Enter address"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

                {/* Interest Areas */}
                <div>
              <label className="block font-medium mb-1">Looking For</label>
              <Field
                as="select"
                name="interestAreas"
                value={values.interestAreas}
                onChange={(e) => setFieldValue("interestAreas", e.target.value)}
                onBlur={handleBlur}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">Select what you are looking for</option>
                <option className="text-gray-500" value="ONGRID">
                  ONGRID – Connected to electricity grid, no battery, lower cost
                </option>
                <option className="text-gray-500" value="HYBRID">
                  HYBRID – Works with grid + batteries, backup during power cuts
                </option>
                <option className="text-gray-500" value="OFFGRID">
                  OFFGRID – Fully independent, uses only batteries/solar, no
                  grid
                </option>
                <option className="text-gray-500" value="KW_1">
                  1 KW – Small setup for basic needs
                </option>
                <option className="text-gray-500" value="KW_2">
                  2 KW – Suitable for small homes
                </option>
                <option className="text-gray-500" value="KW_3">
                  3 KW – Medium household usage
                </option>
                <option className="text-gray-500" value="KW_4">
                  4 KW – Higher usage homes
                </option>
              </Field>
            </div>

            {/* Birthday */}
            <div>
              <label className="block font-medium mb-1">DOB</label>
              <Field
                type="date"
                name="birthday"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Info Source */}
            <div>
              <label className="block font-medium mb-1">Lead Source</label>
              <Field
                type="text"
                name="infoSource"
                placeholder="Enter info source"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1">Notes</label>
              <Field
                type="text"
                name="notes"
                placeholder="Enter notes"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Follow Up */}
            <div>
              <label className="block font-medium mb-1">Follow Up</label>
              <Field
                type="date"
                name="followUp"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Work Category */}
            <div>
              <label className="block font-medium mb-1">Work Category</label>
              <Field
                type="text"
                name="workCategory"
                placeholder="Enter work category"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Reels Video */}
            {/* <div>
              <label className="block font-medium mb-1">Reels Video</label>
              <Field
                type="text"
                name="reelsVideo"
                placeholder="Enter reels video"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div> */}

            {/* Start Date */}
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <Field
                type="date"
                name="startDate"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Lead Stage */}
            <div>
              <label className="block font-medium mb-1">Lead Stage</label>
              <Field
                as="select"
                name="leadStage"
                value={values.leadStage}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option className="text-gray-500" value="NEW_LEAD">
                  New Lead
                </option>
                <option className="text-gray-500" value="IN_PROCESS">
                  In Process
                </option>
                <option className="text-gray-500" value="QUALIFIED">
                  Qualified
                </option>
                <option className="text-gray-500" value="SITE_VISIT_SCHEDULE">
                  Site Visit Scheduled
                </option>
                <option className="text-gray-500" value="SITE_VISIT_DONE">
                  Site Visit Done
                </option>
                <option className="text-gray-500" value="ESTIMATE_SENT">
                  Estimate Sent
                </option>
                <option className="text-gray-500" value="NEGOTIATION">
                  Negotiation
                </option>
                <option className="text-gray-500" value="LEAD_LOST">
                  Lead Lost
                </option>
                <option className="text-gray-500" value="ON_HOLD">
                  On Hold
                </option>
                <option className="text-gray-500" value="LEAD_WON">
                  Lead Won
                </option>
              </Field>
              {errors.leadStage && touched.leadStage && (
                <div className="text-red-500">{errors.leadStage}</div>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="block font-medium mb-1">Priority</label>
              <Field
                as="select"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option className="text-gray-500" value="LOW">
                  Low
                </option>
                <option className="text-gray-500" value="MEDIUM">
                  Medium
                </option>
                <option className="text-gray-500" value="HIGH">
                  High
                </option>
              </Field>
              {errors.priority && touched.priority && (
                <div className="text-red-500">{errors.priority}</div>
              )}
            </div>

            {/* Progress Board */}
            <div>
              <label className="block font-medium mb-1">Progress Board</label>
              <Field
                type="text"
                name="progressBoard"
                placeholder="Enter progress board"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Location (State, District, Tehsil, Village) */}
            <div>
              <label className="block font-medium mb-1">State</label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
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
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tehsil</label>
              <Field
                type="text"
                name="tehsil"
                placeholder="Enter tehsil"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Village</label>
              <Field
                type="text"
                name="village"
                placeholder="Enter village"
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
              />
            </div>

            {/* Images */}
            {/* <div>
              <label className="block font-medium mb-1">
                Lead Photo <span>(Optional)</span>
              </label>
              <input
                type="file"
                name="images"
                multiple
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
                onChange={(e) =>
                  setFieldValue("images", [
                    ...(values.images || []),   // keep old ones
                    ...Array.from(e.currentTarget.files),
                  ])
                }
              />
            </div> */}

            {/* Attachments */}
            {/* <div>
              <label className="block font-medium mb-1">Attachments</label>
              <input
                type="file"
                name="attachments"
                multiple
                className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
                onChange={(e) =>
                  setFieldValue("attachments", [
                    ...(values.attachments || []),
                    ...Array.from(e.currentTarget.files),
                  ])
                }
              />
            </div> */}

            {/* Submit */}
            <div className="  flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 mt-4 w-full font-semibold cursor-pointer hover:opacity-80 transition-all text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex justify-center items-center gap-2 ${
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

export default CreateLeadForm;
