import { MdDeleteOutline } from "react-icons/md";
import DeletePopup from "../Employee/DeletePopup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FolderdataById from "./FolderdataById";
import usegetmediabyid from "../../Hooks/CreateAttachments/usegetmediabyid.jsx";

export default function FolderCard({ data , loading, leadId , deleteFolder , refetch }) {

  const user = useSelector((state) => state.userdata.user);
  const [OpenDeleteFolder, setOpenDeleteFolder] = useState(false);
  const [Deleteloading , setDeleteloading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [openModale , setopenModale] = useState(null);
  const items = Array.isArray(data) ? data : [];
  const filtered = items.filter((item) => String(item?.customerId) === String(leadId));

  const { getfolderdata, loadingId } = usegetmediabyid(openModale || ""); // api call

  const handledelete = async () => {
    if (!selectedFolder) return;
    
    try {
      setDeleteloading(true);
      await deleteFolder(selectedFolder.id);
      toast.success("Folder deleted successfully");
      setOpenDeleteFolder(false);
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete folder. Please try again."
      );
    } finally {
      setDeleteloading(false);
    }
  };

  const openDeleteDialog = (folder) => {
    setSelectedFolder(folder || null);
    setOpenDeleteFolder(true);
  };


  if (loading) {
    return (
      <div className="col-span-2 text-center text-sm text-gray-500">Loading folders…</div>
    );
  }

  if (!filtered.length) {
    return (
      <div className="col-span-2 text-center text-sm text-gray-500">No folders for this lead yet.</div>
    );
  }

  return (
   <>
   {filtered.map((item) => (
    <div
      key={item?.id}
      className="flex cursor-pointer w-[300px] items-center justify-between border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition"
      onClick={() => setopenModale(item?.id)}
    >
    {/* Left side */}
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded bg-orange-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-orange-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h4l2-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          />
        </svg>
      </div>
      <div>
        <p className="font-medium text-gray-800">{item?.folderName}</p>
        <p className="text-sm text-gray-500">{item?.attachmentsCount} Files</p>
      </div>
    </div>

    {/* Delete Button */}
   {user.role === "ADMIN" && (
    <button
      className="text-red-500 cursor-pointer hover:text-red-600 transition"
      onClick={(e) => { e.stopPropagation(); openDeleteDialog(item); }}
    >
      <MdDeleteOutline size={20} />
    </button>
   )}
  </div>
    ))}

    {OpenDeleteFolder && selectedFolder && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <DeletePopup
          close={setOpenDeleteFolder}
          onDelete={handledelete}
          loading={Deleteloading}
        />
      </div>
    )}

  {/* open modale for the folder data */}

  {openModale && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <FolderdataById close={setopenModale} data={getfolderdata} loadingId={loadingId} />
    </div>
  )}
    
   </>
  );
}
