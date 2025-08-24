import React from "react";
import { Formik, Form, Field } from "formik";
import usePostcustomerData from "../../Hooks/usePostcustomerData";
import { toast } from "react-toastify";

const CreateLeadForm = ({close}) => {

  const { Apicall } = usePostcustomerData(); // custom hook for post customer data
  return (
    <div className="max-w-6xl mx-auto p-6  bg-white rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        <span className="text-orange-500 font-semibold">Create</span> Lead
      </h2>

      <Formik
        initialValues={{
          name: "",
          phoneNumber: "",
          whatsappNumber: "",
          interestAreas: "",
          address: "",
          birthday: "",
          infoSource: "",
          notes: "",
          followUp: "",
          workCategory: "",
          reelsVideo: "",
          startDate: "",
          leadStage: "",
          priority: "",
          progressBoard: "",
          state: "",
          district: "",
          tehsil: "",
          village: "",
          images: [],
          attachments: [],
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            // Create FormData instance
            const formData = new FormData();

            // Append text fields
            Object.keys(values).forEach((key) => {
              if (
                ![
                  "images",
                  "attachments",
                  "state",
                  "district",
                  "tehsil",
                  "village",
                ].includes(key)
              ) {
                formData.append(key, values[key] || "");
              }
            });
            // Append location as nested object
            formData.append(
              "location",
              JSON.stringify({
                state: values.state,
                district: values.district,
                tehsil: values.tehsil,
                village: values.village,
              })
            );

            // Append files
            if (values.images) {
              Array.from(values.images).forEach((file) => {
                formData.append("images", file);
              });
            }
            if (values.attachments) {
              Array.from(values.attachments).forEach((file) => {
                formData.append("attachments", file);
              });
            }
            const result = await Apicall(formData);
            console.log(result);
            if (result) {
              toast.success("Lead created successfully");
              resetForm();
              close(false);
            }
          } catch (error) {
            toast.error("Failed to create lead");
          }
        }}
      >

        {({setFieldValue})=>(
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Enter name"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <Field
              type="number"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
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

          {/* Interest Areas */}
          <div>
            <label className="block font-medium mb-1">Interest Areas</label>
            <Field
              type="text"
              name="interestAreas"
              placeholder="Enter interest areas"
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
            <label className="block font-medium mb-1">Info Source</label>
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
          <div>
            <label className="block font-medium mb-1">Reels Video</label>
            <Field
              type="text"
              name="reelsVideo"
              placeholder="Enter reels video"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

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
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Select Lead Stage</option>
              <option value="NEW_LEAD">New Lead</option>
              <option value="IN_PROCESS">In Process</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="SITE_VISIT_SCHEDULE">Site Visit Scheduled</option>
              <option value="SITE_VISIT_DONE">Site Visit Done</option>
              <option value="ESTIMATE_SENT">Estimate Sent</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="LEAD_LOST">Lead Lost</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="LEAD_WON">Lead Won</option>
            </Field>
          </div>

          {/* Priority */}
          <div>
            <label className="block font-medium mb-1">Priority</label>
            <Field
              as="select"
              name="priority"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Select Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Field>
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
            <Field
              type="text"
              name="state"
              placeholder="Enter state"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">District</label>
            <Field
              type="text"
              name="district"
              placeholder="Enter district"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tehsil</label>
            <Field
              type="text"
              name="tehsil"
              placeholder="Enter tehsil"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Village</label>
            <Field
              type="text"
              name="village"
              placeholder="Enter village"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium mb-1">Upload Images</label>
            <input
              type="file"
              name="images"
              multiple
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              onChange={(e) => setFieldValue("images", e.currentTarget.files)}
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block font-medium mb-1">Attachments</label>
            <input
              type="file"
              name="attachments"
              multiple
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              onChange={(e) =>
                setFieldValue("attachments", e.currentTarget.files)
              }
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 mt-4 w-full font-semibold t cursor-pointer hover:opacity-80 transition-all text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-500"
            >
              Create
            </button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateLeadForm;
