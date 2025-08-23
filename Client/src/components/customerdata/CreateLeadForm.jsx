import React from "react";
import { Formik, Form, Field } from "formik";

const CreateLeadForm = () => {
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
          images: "",
          attachments: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
    
      >
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
            <label className="block font-medium mb-1">Birthday</label>
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
              <option value="In Process">In Process</option>
              <option value="Qualified">Qualified</option>
              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
              <option value="Site Visit Done">Site Visit Done</option>
              <option value="Estimate Sent">Estimate Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Lead Lost">Lead Lost</option>
              <option value="On Hold">On Hold</option>
              <option value="Lead Won">Lead Won</option>
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
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
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 mt-4 w-full font-semibold t cursor-pointer hover:opacity-80 transition-all text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-500"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateLeadForm;
