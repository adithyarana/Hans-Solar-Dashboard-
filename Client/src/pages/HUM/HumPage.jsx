import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ALLHumData from "../../components/Hum/ALLHumData";
import usegethumdata from "../../Hooks/HUM/usegethumdata";
import CreateHumForm from "../../components/Hum/CreateHumform";
const HumPage = () => {
  const [open, setOpen] = useState(false);
  const {loading, humdata, refetch} = usegethumdata()  // get all hum data
  return (
    <div className="h-screen ">
      {/* top section */}
      <div className="z-30 flex gap-3">
        <div className=" bg-white w-full text-gray-600 font-medium   p-5 text-xl border border-gray-300 mt-5 ml-5">
          Hans Urja Mitra
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center mr-6 rounded-xl text-nowrap cursor-pointer hover:opacity-80 transition-all  
                bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2 mt-4 gap-1"
        >
          <FaPlus size={26} />
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="relative bg-gray-50 w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto p-6">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              <CreateHumForm close={setOpen} refetch={refetch} />
            </div>
          </div>
        )}
      </div>

      <div className="h-screen">
        <ALLHumData loading={loading} humdata={humdata}/>
      </div>

         {/* Bottom wave flipped */}
         <div className="absolute bottom-0 left-0 mb-1 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 transform rotate-180"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-orange-500/20"
          ></path>
        </svg>
      </div>

    </div>
  );
};

export default HumPage;
