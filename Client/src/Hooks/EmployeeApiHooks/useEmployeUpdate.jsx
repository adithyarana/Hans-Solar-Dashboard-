import axios from "axios";
import { UpdateEmployeeData } from "../../constants/Apiurls";

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
      console.error("Update API error:", error);
      throw error;
    }
  };

  return { UpdateApicall };
};

export default useEmployeUpdate;
