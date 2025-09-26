import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { RxCross2 } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const UploadAttachments = ({close, CreateFolder, loading, setloading, refetch}) => {

  


  return (
    <div className="card p-6 w-[500px] bg-gradient-to-br from-white via-white to-white rounded-lg">
      <div className="text-2xl flex justify-between items-center font-semibold mb-6  text-gray-800">
        <h2 className="text-orange-500 font-semibold">Upload Attachment</h2>
        <button onClick={() => close()} className="text-gray-500 cursor-pointer"><RxCross2 size={24}/></button>
      </div>

      <div className="space-y-4">
        <Formik
          initialValues={{
            folderName: "",
            description: "",
            attachments: "",
          }}
          validate={(value) => {
            let errors = {};
            if (!value.folderName)
              errors.folderName = "Folder Name is required";

            if (!value.attachments) errors.attachments = "File is required";
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            setloading(true);

            try {
              const formData = new FormData();

              // Append simple fields
              formData.append("folderName", values.folderName || "");
              formData.append("description", values.description || "");

              // Append each selected file
              if (values.attachments && values.attachments.length) {
                Array.from(values.attachments).forEach((file) => {
                  formData.append("attachments", file);
                });
              }

              const response = await CreateFolder(formData);

              if(response){
                toast.success("Folder Created Successfully");
                close();
                resetForm();
                refetch();
              }
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message);
              setloading(false);
            }
          }}
        >
          {({ setFieldValue, handleChange, handleBlur, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Folder Name
                </label>

                <div>
                  <Field
                    type="text"
                    name="folderName"
                    placeholder="Folder Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>

                {errors.folderName && touched.folderName && (
                  <div className="text-red-500 text-sm italic">
                    {errors.folderName}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>

                <div>
                  <Field
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Files</label>
                <input
                  type="file"
                  name="attachments"
                  multiple
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-orange-300"
                  onChange={(e) => setFieldValue("attachments", e.currentTarget.files)}
                />
                {errors.attachments && touched.attachments && (
                  <div className="text-red-500 text-sm italic">
                    {errors.attachments}
                  </div>
                )}
              </div>

              <div className="flex justify-center  ">
                <button type="submit" className=" w-full cursor-pointer bg-gradient-to-l from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold shadow hover:bg-indigo-700 transition duration-300">
                  <span className="flex items-center justify-center gap-2"><FaCloudUploadAlt size={20}/>{loading ? "Uploading..." : "Upload"}</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadAttachments;
