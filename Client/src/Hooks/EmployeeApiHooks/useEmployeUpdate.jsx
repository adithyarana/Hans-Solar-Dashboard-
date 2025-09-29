import axios from "axios";
import { UpdateEmployeeData } from "../../constants/Apiurls";
import { toast } from "react-toastify";

const useEmployeUpdate = () => {
  const UpdateApicall = async (id, updatedata) => {
    try {
      const Apicall = await axios.put(
        `${UpdateEmployeeData}${id}`,
        updatedata,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return Apicall.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  return { UpdateApicall };
};

export default useEmployeUpdate;
