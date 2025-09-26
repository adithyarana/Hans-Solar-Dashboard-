import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GetallFolder } from "../../constants/Apiurls";

const usegetallfolder = () => { 

  const [getallfolderData, setgetallfolderData] = useState([]);
  const [Loading , setLoading] = useState(false);

  const getallfolder = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(GetallFolder, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setgetallfolderData(response.data?.data || []);
    
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
    finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    getallfolder();
  }, [getallfolder]);

  return {
    getallfolderData,
    refetch: getallfolder,
    Loading
  }
};  

export default usegetallfolder;
